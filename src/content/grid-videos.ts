import { styles } from "./styles";

export class GridVideos {
  private current: number | undefined = undefined;

  constructor(private queryId = "ytd-rich-item-renderer") {}

  private selectGridVideos() {
    return document.querySelectorAll(this.queryId);
  }

  private applyHighlight(videos: NodeListOf<Element>, index: number) {
    if (index < 0 || index >= videos.length) {
      return;
    }

    if (this.current !== undefined && videos[this.current]) {
      videos[this.current].classList.remove(styles.highlight);
    }

    this.current = index;
    const nextVideo = videos[this.current] as HTMLElement | undefined;
    if (!nextVideo) return;

    nextVideo.classList.add(styles.highlight);
    nextVideo.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }

  public clickHighlighted() {
    if (this.current === undefined) {
      return;
    }

    const videos = this.selectGridVideos();
    videos[this.current]?.querySelector("a")?.click();
  }

  public unhighlight() {
    if (this.current === undefined) {
      return;
    }

    const videos = this.selectGridVideos();
    videos[this.current]?.classList.remove(styles.highlight);
    this.current = undefined;
  }

  public highlightFirst() {
    const videos = this.selectGridVideos();

    this.applyHighlight(videos, 0);
  }

  public highlightNext() {
    if (this.current === undefined) {
      this.highlightFirst();
      return;
    }

    const videos = this.selectGridVideos();

    this.applyHighlight(videos, this.current + 1);
  }

  public highlightPrevious() {
    if (this.current === undefined) {
      this.highlightFirst();
      return;
    }

    if (this.current === 0) return;

    const videos = this.selectGridVideos();

    this.applyHighlight(videos, this.current - 1);
  }

  public highlightUp() {
    if (this.current === undefined) {
      this.highlightFirst();
      return;
    }
    const videos = this.selectGridVideos();
    const itemsPerRow = Number(videos[this.current].getAttribute("items-per-row"));

    if (this.current - itemsPerRow < 0) {
      return;
    }

    this.applyHighlight(videos, this.current - itemsPerRow);
  }

  public highlightDown() {
    if (this.current === undefined) {
      this.highlightFirst();
      return;
    }

    const videos = this.selectGridVideos();
    const itemsPerRow = Number(videos[this.current].getAttribute("items-per-row"));

    if (this.current + itemsPerRow >= videos.length) {
      return;
    }

    this.applyHighlight(videos, this.current + itemsPerRow);
  }
}
