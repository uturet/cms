export class Message {
  public _id?: string;

  constructor(
    public id: string,
    public subject: string,
    public msgText: string,
    public sender: string
  ) {}
}
