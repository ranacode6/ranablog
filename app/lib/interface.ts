export interface BlogCard {
  title: string;
  smallDescription: string;
  currentSlug: string;
  publishedAt: Date;
  titleImage: any;
}

export interface SingleBlog {
  currentSlug: string;
  title: string;
  smallDescription: string;
  content: any;
  titleImage: string;
}

export interface blogUrl {
  url?: string;
  lastModified?: Date;
}
