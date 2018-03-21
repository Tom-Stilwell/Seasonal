const sprite = options => {
  var that = {};

  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;

  return that;
};

export default sprite;
