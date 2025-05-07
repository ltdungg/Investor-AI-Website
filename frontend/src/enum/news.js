class News {
  constructor({ id, title, date, redirectUrl, thumb, publisher, description }) {
    this.id = id;
    this.title = title;
    this.date = new Date(date);
    this.redirectUrl = redirectUrl;
    this.thumb = thumb;
    this.publisher = publisher;
    this.description = description;
  }
}

export default News;
