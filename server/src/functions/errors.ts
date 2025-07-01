export class ShortUrlAlreadyExists extends Error {
  constructor() {
    super('Short URL already exists');
  }
}

export class LinkNotFound extends Error {
  constructor() {
    super('Link not found');
  }
}