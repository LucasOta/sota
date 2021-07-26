import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-testimonial',
  template: `
    <div class="container">
      <div class="row justify-content-center">
          <div class="col-lg-9">
              <div class="dk-reviews  text-center">
                <h2 class="pt50" style="font-weight: 400;">{{'Client Testimonial' | translate}}</h2>
                  <div class="dk-reviews-text">
                      <p class="mb-0 pt30" style="font-style:  italic;">{{item.testimonial.quote[0].quote}}</p>
                  </div>
                  <div class="pt30">- <strong>{{item.testimonial.name}}</strong>, {{item.testimonial.jobTitle[0].quote}}</div>
              </div>
          </div>
      </div>
    </div>
  `
})
export class TestimonialComponent implements OnInit {
  @Input() item: Item;
  constructor() { }

  ngOnInit(): void {
  }

}
