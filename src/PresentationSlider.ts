export class PresentationSlider {
  /**
   * current position
   * @var number
   */
  protected _position: number = 0;

  /**
   * @var number
   */
  protected _maxPagerItemCount: number = 10;

  /**
   * @var HTMLElement
   */
  protected _rootElement: HTMLElement;
  protected _prevArrowElement: HTMLElement;
  protected _nextArrowElement: HTMLElement;
  protected _pagerElement: HTMLElement;

  private _prevArrowId: string = "prev-arrow";
  private _nextArrowId: string = "next-arrow";

  private _slideClassName = "slide";

  /**
   * Constructor
   * @param idName string
   */
  public constructor(idName: string) {
    if ("" === idName) {
      throw new Error("className argument must be set");
    }

    this._rootElement = document.getElementById(idName);
    this._initialize();
  }

  protected _initialize(): void {
    let slides = this.getSlides();
    slides[this.currentPosition()].style.display = "block";

    // Trigger event
    this._prevArrowElement = document.getElementById(this._prevArrowId);
    this._nextArrowElement = document.getElementById(this._nextArrowId);

    // show pager
    this._pagerElement = this._rootElement.getElementsByClassName(
      "pager"
    )[0] as HTMLElement;

    var pagerChildren = document.createElement("ul");

    let length =
      slides.length < this._maxPagerItemCount
        ? slides.length
        : this._maxPagerItemCount;
    for (let index = 0; index < length; index++) {
      var elm = document.createElement("li");
      elm.className = "pager-item";

      if (this.currentPosition() === index) {
        elm.className += " active";
      }

      pagerChildren.append(elm);
    }
    this._pagerElement.append(pagerChildren);

    this._prevArrowElement.addEventListener<"click">(
      "click",
      (ev: MouseEvent) => {
        // alert("prevArrow Clicked");
        this.decrementPosition(slides.length);
      }
    );
  }

  /**
   * Run slide show
   */
  public async run(intervalMs: number = 3000): Promise<void> {
    intervalMs = intervalMs < 0 ? 3000 : intervalMs;

    await this.interval(intervalMs, () => {
      return true;
    });
  }

  /**
   *
   */
  protected async _moveSlide() {
    let slides = this.getSlides();
    let pagerItems = this._pagerElement.getElementsByClassName("pager-item");

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "";
    }

    pagerItems[this.currentPosition()].className = "pager-item";

    // Incremented slide index
    let slideIndex = this.incrementPosition(slides.length);
    slides[slideIndex].style.display = "block";

    pagerItems[slideIndex].className += " active";
  }

  /**
   *
   * @param ms
   * @param stopCondition
   */
  protected async interval(
    ms: number,
    stopCondition: () => boolean
  ): Promise<void> {
    while (stopCondition()) {
      await new Promise((resolve) => setTimeout(resolve, ms));
      this._moveSlide();
    }
  }

  /**
   * Get current slide position
   * @returns number current position index number
   */
  protected currentPosition(): number {
    return this._position < 0 ? 0 : this._position;
  }

  /**
   * Increment position count
   * @param maxCount
   * @returns
   */
  protected incrementPosition(maxCount: number): number {
    this._position = (this._position + 1) % maxCount;
    return this.currentPosition();
  }

  /**
   * Decrement position count
   * @param maxCount
   * @returns
   */
  protected decrementPosition(maxCount: number): number {
    this._position =
      this._position - 1 < 0 ? maxCount : this._position - (1 % maxCount);
    return this.currentPosition();
  }

  protected getSlides(): HTMLCollectionOf<HTMLElement> {
    return document.getElementsByClassName(
      this._slideClassName
    ) as HTMLCollectionOf<HTMLElement>;
  }
}
