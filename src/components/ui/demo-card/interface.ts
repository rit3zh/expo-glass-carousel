interface IDemoCard {
  index: number;
  title: string;
  caption: string;
  color: string;
}

type TDemoCardData = Omit<IDemoCard, "index">;

export { type IDemoCard, type TDemoCardData };
