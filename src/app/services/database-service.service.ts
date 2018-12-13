import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from '../models/post';
import {map} from 'rxjs/operators';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';

@Injectable()
export class DatabaseService {
  postsCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  postDoc: AngularFirestoreDocument<Post>;

  constructor(private db: AngularFirestore) {
    this.postsCollection = this.db.collection('posts');
    this.posts = this.postsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        data.key = a.payload.doc.id;
        return data;
      });
    }));
  }

  getPosts() {
    return this.posts;
  }

  addPost(post: Post): void {
    this.postsCollection.add(post);
  }

  deletePost(key: string) {
    this.postDoc = this.postsCollection.doc(key);
    this.postDoc.delete();
  }

  updatePost(key: string, value: any) {
    this.postDoc = this.postsCollection.doc(key);
    this.postDoc.update(value);
  }
}
