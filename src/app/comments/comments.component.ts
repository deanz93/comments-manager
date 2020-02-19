import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';
import { isNumber } from 'util';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  title = 'Comments';
  comments = [];
  tempcomments = [];
  individuPost = [];
  error: any;
  postLength: number;
  loads: number = 5;
  count: number = 0;
  loading: boolean = true;
  displaySearch: boolean = false;

  constructor(
    private apiService: ApiService,
  ) {
    Swal.fire({
      title: 'Please Wait',
      html: 'Requesting Data From Server',
      allowOutsideClick: false,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    })
    this.loadPost();
  }

  ngOnInit(): void {
  }
  filter(index: number, searchValue: string) {
    if (searchValue != '') {
      this.comments[index] = this.filterByValue(this.comments[index], searchValue);
    } else {
      this.comments[index] = this.tempcomments[index];
    }
  }

  filterByValue(array, string) {
    return array.filter(o =>
      Object.keys(o).some(k => o[k].toString().toLowerCase().includes(string.toLowerCase())));
  }

  getPostComment(id: any) {
    this.loading = !this.loading;
    this.displaySearch = true;
    this.apiService.getComment(id+1)
    .subscribe((result: any) => {
      // return result;
      this.comments[id] = result;
      this.tempcomments[id] = result;
      this.loading = !this.loading;
      document.getElementById(id).style.visibility = "hidden";
    }, // success path
      error => this.error = error // error path
    );
  }
  loadMore() {
    Swal.fire({
      title: 'Please Wait',
      html: 'Requesting Data From Server',
      allowOutsideClick: false,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    })
    this.count = this.loads;
    this.loads = this.loads + 5;
    this.loadPost();
  }

  loadPost() {
    if (this.count < this.loads) {
      this.apiService.individuPost(this.count+1)
      .subscribe((result: any) => {
        this.individuPost.push(result);
        this.count++;
        if (this.count == this.loads){
          Swal.close();
        } else {
          this.loadPost();
        }
      }, // success path
      (error) => {
        this.loadPost();
        this.error = error; // error path
      });
    }
  }
}
