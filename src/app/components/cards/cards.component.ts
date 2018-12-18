import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth-service.service';
import {NgbCarouselConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatabaseService} from '../../services/database-service.service';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {Subscription} from 'rxjs';
import {Post} from '../../models/post';
import {Comment} from '../../models/comment';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit, OnDestroy {
  @Output() alertDisplay: EventEmitter<any> = new EventEmitter();

  public swipeConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 4,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  userSub: Subscription;
  private isLoggedIn: boolean;
  userDetail: firebase.User;
  posts: Post[];
  validPosts: Post[];
  sortedPosts: Post[];
  indices: number[];
  editState = false;
  submitted = false;
  showFeedback = false;
  postToEdit: Post;
  clicked: Post;
  postSub: Subscription;
  idxModal: number;
  today = new Date();
  commentForm: FormGroup;
  updatedComm: Comment;
  likeModel = {
    like: false,
    unlike: false
  };

  constructor(private authService: AuthService, private dbService: DatabaseService, private config: NgbCarouselConfig,
              private modalService: NgbModal, private formBuilder: FormBuilder) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
    config.wrap = true;
    config.interval = 5000;
    config.keyboard = false;
    library.add(fas, far);
  }

  ngOnInit() {
    this.userSub = this.authService.isAuthenticated().subscribe(user => {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.userDetail = user;
    });

    this.postSub = this.dbService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.validPosts = [];
      this.sortedPosts = [];
      for (let i = 0; i < this.posts.length; i++) {
        if (!this.isExpired(this.posts[i].expired)) {
          this.validPosts.push(this.posts[i]);
          this.sortedPosts.push(this.posts[i]);
        }
      }

      this.sortedPosts.sort(function (a, b) {
        return a.like.length > b.like.length ? -1 : a.like.length < b.like.length ? 1 : 0;
      });

      this.indices = [];
      for (let i = 0; i < this.validPosts.length; i += 2) {
        this.indices.push(i);
      }
    });

    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
  }

  get form() {
    return this.commentForm.controls;
  }

  updateLike(data: Post, like) {
    if (like === 'like') {
      const array = this.clicked.like;
      array.push(this.authService.getUid());
      this.dbService.updatePost(this.clicked.key, {like: array});
    } else {
      const array = this.clicked.unlike;
      array.push(this.authService.getUid());
      this.dbService.updatePost(this.clicked.key, {unlike: array});
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.postSub.unsubscribe();
  }

  clickPost(post: Post, cardmodal) {
    if (!this.isLoggedIn) {
      this.alertDisplay.emit();
    } else {
      console.log(post.category);
      this.clicked = post;
      this.modalService.open(cardmodal, {centered: true, size: 'lg'});
    }
  }

  updateIndex(value) {
    if (!(this.idxModal + value < 0) && (this.idxModal + value) < this.posts.length) {
      this.idxModal += value;
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.commentForm.invalid) {
      return;
    }
    this.addComment();
    this.resetForm();
  }

  resetForm() {
    this.submitted = false;
    this.commentForm.reset();
  }

  addComment() {
    this.updatedComm = {
      uid: this.authService.getUid(),
      content: this.commentForm.value['content'],
      date: new Date().getTime()
    };
    const comments = this.clicked.comments ? this.clicked.comments : [];

    comments.push(this.updatedComm);

    this.dbService.updatePost(this.clicked.key, {comments: comments});
  }

  getWeekAgo(expired) {
    const weekago = new Date();
    weekago.setTime(expired);
    weekago.setDate(weekago.getDate() - 7);

    return weekago;
  }

  isExpired(expired) {
    const postDate = new Date();
    postDate.setTime(expired);

    if (this.today.getUTCFullYear() > postDate.getUTCFullYear()) {
      return false;
    } else if (this.today.getUTCMonth() > postDate.getUTCMonth()) {
      return false;
    } else if (this.today.getUTCDate() > postDate.getUTCDate()) {
      return false;
    }

    return false;
  }

  public onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
  }

}
