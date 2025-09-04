import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { Tag } from 'primeng/tag';
import { PrimeNgSharedModule } from '../../../shared/modules/shared/primeng-shared.module';

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
  options: ProductOption[];
  price: number;
  likes: number;
  images?: string[];
  status?: string;
  maxPrice?: number;
  minPrice?: number;
}

interface ProductOption {
  key: string;
  choices: ProductChoice[];
}

interface ProductChoice {
  value: string;
  additionPrice: number;
  quantity: number;
  image: string[];
}
@Component({
  selector: 'product-list',
  imports: [Carousel, PrimeNgSharedModule, Tag, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  @Input() header: string = '';
  @Input() data: Product[] = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'ساعة خشب البامبو',
      description: 'ساعة أنيقة مصنوعة من خشب البامبو الطبيعي',
      category: 'إكسسوارات',
      options: [
        {
          key: 'الحجم',
          choices: [
            {
              value: 'كبير',
              additionPrice: 0,
              quantity: 24,
              image: [
                'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
            {
              value: 'صغير',
              additionPrice: -10,
              quantity: 15,
              image: [
                'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
          ],
        },
        {
          key: 'اللون',
          choices: [
            {
              value: 'أسود',
              additionPrice: 5,
              quantity: 10,
              image: [
                'https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
          ],
        },
      ],
      price: 65,
      likes: 5000,
    },
    {
      id: '1001',
      code: 'nvklal433',
      name: 'حقيبة جلدية سيدات',
      description: 'حقيبة يد جلدية عالية الجودة بتصميم عصري',
      category: 'إكسسوارات',
      options: [
        {
          key: 'اللون',
          choices: [
            {
              value: 'أحمر',
              additionPrice: 0,
              quantity: 12,
              image: [
                'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                'https://images.unsplash.com/photo-1591348122449-8af5c6fbd8ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
              ],
            },
            {
              value: 'أسود',
              additionPrice: 0,
              quantity: 18,
              image: [
                'https://images.unsplash.com/photo-1554342872-034a06541bad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/2895239/pexels-photo-2895239.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
          ],
        },
      ],
      price: 120,
      likes: 3200,
    },
    {
      id: '1002',
      code: 'zz21cz3c1',
      name: 'نظارات شمسية',
      description: 'نظارات شمسية كلاسيكية مع حماية من الأشعة فوق البنفسجية',
      category: 'إكسسوارات',
      options: [
        {
          key: 'النوع',
          choices: [
            {
              value: 'أفياتور',
              additionPrice: 15,
              quantity: 8,
              image: [
                'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/326874/pexels-photo-326874.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
            {
              value: 'مستطيل',
              additionPrice: 0,
              quantity: 14,
              image: [
                'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
          ],
        },
      ],
      price: 85,
      likes: 4100,
    },
    {
      id: '1003',
      code: '244wgerg2',
      name: 'سماعات لاسلكية',
      description: 'سماعات بلوتوث عالية الجودة مع عزل للضوضاء',
      category: 'إلكترونيات',
      options: [
        {
          key: 'اللون',
          choices: [
            {
              value: 'أبيض',
              additionPrice: 0,
              quantity: 20,
              image: [
                'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
            {
              value: 'أسود',
              additionPrice: 10,
              quantity: 15,
              image: [
                'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/3394663/pexels-photo-3394663.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
          ],
        },
      ],
      price: 200,
      likes: 7800,
    },
    {
      id: '1004',
      code: 'h456wer53',
      name: 'حذاء رياضي',
      description: 'حذاء رياضي مريح ومناسب لجميع أنواع الرياضة',
      category: 'أحذية',
      options: [
        {
          key: 'المقاس',
          choices: [
            {
              value: '40',
              additionPrice: 0,
              quantity: 10,
              image: [
                'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
            {
              value: '42',
              additionPrice: 0,
              quantity: 8,
              image: [
                'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
          ],
        },
      ],
      price: 150,
      likes: 2900,
    },
    {
      id: '1005',
      code: 'av2231fwg',
      name: 'قلم حبر فاخر',
      description: 'قلم حبر سائل بجودة عالية بتصميم أنيق',
      category: 'قرطاسية',
      options: [
        {
          key: 'اللون',
          choices: [
            {
              value: 'ذهبي',
              additionPrice: 20,
              quantity: 5,
              image: [
                'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/6062510/pexels-photo-6062510.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
            {
              value: 'فضي',
              additionPrice: 10,
              quantity: 8,
              image: [
                'https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/6062512/pexels-photo-6062512.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
          ],
        },
      ],
      price: 80,
      likes: 1200,
    },
    {
      id: '1006',
      code: 'bib324ffr',
      name: 'كتاب تطوير الذات',
      description: 'كتاب ملهم لتحسين مهاراتك الشخصية والمهنية',
      category: 'كتب',
      options: [
        {
          key: 'الغلاف',
          choices: [
            {
              value: 'ورقي',
              additionPrice: 0,
              quantity: 30,
              image: [
                'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/48604/pexels-photo-48604.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
            {
              value: 'جلد',
              additionPrice: 15,
              quantity: 10,
              image: [
                'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/1926988/pexels-photo-1926988.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
          ],
        },
      ],
      price: 45,
      likes: 3400,
    },
    {
      id: '1007',
      code: 'mbvjkgip5',
      name: 'ماوس لاسلكي',
      description: 'ماوس لاسلكي دقيق مع عمر بطارية طويل',
      category: 'إلكترونيات',
      options: [
        {
          key: 'اللون',
          choices: [
            {
              value: 'أزرق',
              additionPrice: 5,
              quantity: 12,
              image: [
                'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
            {
              value: 'أسود',
              additionPrice: 0,
              quantity: 18,
              image: [
                'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/2582928/pexels-photo-2582928.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
          ],
        },
      ],
      price: 75,
      likes: 2100,
    },
    {
      id: '1008',
      code: 'vbb1245tr',
      name: 'مظلة شمسية',
      description: 'مظلة شمسية كبيرة مقاومة للماء والأشعة فوق البنفسجية',
      category: 'أدوات خارجية',
      options: [
        {
          key: 'اللون',
          choices: [
            {
              value: 'أزرق',
              additionPrice: 0,
              quantity: 7,
              image: [
                'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
            {
              value: 'أخضر',
              additionPrice: 0,
              quantity: 9,
              image: [
                'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
          ],
        },
      ],
      price: 110,
      likes: 900,
    },
    {
      id: '1009',
      code: 'cm230f032',
      name: 'كوب ترمس',
      description: 'كوب حافظ للحرارة لمدة 12 ساعة',
      category: 'أدوات منزلية',
      options: [
        {
          key: 'السعة',
          choices: [
            {
              value: '500 مل',
              additionPrice: 0,
              quantity: 25,
              image: [
                'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/4385547/pexels-photo-4385547.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
            {
              value: '750 مل',
              additionPrice: 10,
              quantity: 15,
              image: [
                'https://images.unsplash.com/photo-1608355024223-8f6af5f9d1c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.pexels.com/photos/4207785/pexels-photo-4207785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              ],
            },
          ],
        },
      ],
      price: 55,
      likes: 4300,
    },
  ];
  @Input() getSeverity: (item: any) => any = () => {
    return;
  };
  responsiveOptions: any[] | undefined;

  constructor() {
    this.data.map((item) => this.getPriceRange(this.getImages(item)));
  }

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 4,
        numScroll: 2,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 2,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
  getImages(item: Product): Product {
    const choices = item.options.flatMap((x) => x.choices);
    let images = choices.length > 0 ? choices.flatMap((x) => x.image) : [];
    item.images = images;
    return item;
  }
  getPriceRange(item: Product): Product {
    const choices = item.options.flatMap((x) => x.choices);
    let prices = choices.length > 0 ? choices.flatMap((x) => x.additionPrice) : [];
    const max = Math.max(...prices);
    const min = Math.min(...prices);
    item.maxPrice = item.price + max;
    item.minPrice = item.price + min;
    return item;
  }
}
