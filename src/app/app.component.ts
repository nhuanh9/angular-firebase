import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFile: any;
  fb: any;
  downloadURL: any;
  form = new FormGroup({
    name: new FormControl(''),
    price: new FormControl('')
  })
  constructor(private storage: AngularFireStorage) {
  }

  ngOnInit() {
  }

  onFileSelected(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url:any) => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  save() {
    const obj = {
      name: this.form.value.name,
      price: this.form.value.price,
      image: this.fb
    }
    console.log(obj)
  }
}
