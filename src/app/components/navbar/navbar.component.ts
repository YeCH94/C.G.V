import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AuthService} from '../../services/auth-service.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {Observable} from 'rxjs';
import {ScrollToConfigOptions, ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {WINDOW} from '../../services/window-service.service';
import {DOCUMENT} from '@angular/platform-browser';
import {DatabaseService} from '../../services/database-service.service';
import {Post} from '../../models/post';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('open', style({height: '100%', opacity: 1})),
      state('closed', style({height: 0, opacity: 0})),
      transition('open => closed', [animate('100ms')]),
      transition('closed => open', [animate('100ms')])
    ])
  ]
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  private readonly user: Observable<firebase.User>;
  userDetail: firebase.User;
  modalTitle: string;
  modalType: string;
  inputForm: FormGroup;
  submitted = false;
  navShrink = false;
  today = new Date();
  post: Post;

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window: Window, public authService: AuthService,
              private dbService: DatabaseService, private formBuilder: FormBuilder, private modalService: NgbModal,
              private scrollService: ScrollToService) {
    this.user = authService.isAuthenticated();
    this.user.subscribe(user => {
      this.userDetail = user;
    });
    library.add(fas);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    console.log(number);
    if (number > 100) {
      this.navShrink = true;
    } else if (this.navShrink && number < 10) {
      this.navShrink = false;
    }
  }

  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['Policy', Validators.required]
    });
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  triggerScrollTo(dest) {
    const config: ScrollToConfigOptions = {
      target: dest
    };

    this.scrollService.scrollTo(config);
  }

  get form() {
    return this.inputForm.controls;
  }

  onSubmit(modal) {
    this.submitted = true;

    if (this.inputForm.invalid) {
      return;
    }

    this.saveForm();

    modal.dismiss();
    this.resetForm();
  }

  openModal(content, type) {
    this.modalType = type;

    if (type === 'in') {
      this.modalTitle = '로그인';
    } else if (type === 'out') {
      this.modalTitle = '로그아웃';
    }

    this.modalService.open(content, {centered: true}).result.then(result => {
      if (result === 'GoogleSignIn') {
        this.signInWithGoogle();
      } else if (result === 'SignOut') {
        this.authService.signOut();
      }
    });
  }

  openFormModal(content) {
    this.modalService.open(content, {centered: true, size: 'lg'});
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle().catch((err) => console.log(err));
  }

  resetForm() {
    this.submitted = false;
    this.inputForm.reset();
  }

  saveForm() {
    this.post = {
      title: this.inputForm.value['title'],
      content: this.inputForm.value['content'],
      expired: this.getWeekAfter().getTime(),
      uid: this.authService.getUid(),
      category: this.inputForm.value['category'],
      like: [],
      unlike: []
    };
    this.dbService.addPost(this.post);
  }

  getWeekAfter() {
    const weekafter = new Date();
    weekafter.setDate(this.today.getDate() + 7);

    return weekafter;
  }
}
