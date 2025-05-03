const ENUM = Object.freeze({
  public: "Công khai",
  private: "Riêng tư",
});

function ModeTranslate(mode) {
  return ENUM[mode];
}

export default ModeTranslate;
