import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  title = 'Posts';
  error: any;
  posts: [];

  constructor(
    private apiService: ApiService,
    )
    {
      Swal.fire({
        title: 'Please Wait',
        html: 'Requesting Data From Server',
        timerProgressBar: true,
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading()
        },
      })
      this.apiService.getAllPost()
      .subscribe((result: any) => {
        this.posts = result;
        Swal.close();
        }, // success path
        (error) => {
          this.error = error;
          Swal.close();
          alert(this.error);
      } // error path
      );
    }

  ngOnInit(): void {
  }

}
