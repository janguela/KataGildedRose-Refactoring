// this function cannot be modified. Protected by a grumpy goblin
function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

// this property cannot be modified neither.
var items = [];

// -- END of protected code --

var ItemTypes = {
  AGED_BRIE : 'Aged Brie',
  CONCERT_PASSES : 'Backstage passes to a TAFKAL80ETC concert',
  LEGENDARY_ITEM : 'Sulfuras, Hand of Ragnaros',
  CONJURED_ITEM : 'Conjured item'
};


function update_quality(items) {
  for (var i = 0; i < items.length; i++) {
    _processItemQuality(items[i]);
  }
  return items;
}
function _processItemQuality(item) {
  _processSellInDate(item);
  _processQuality(item);
}

function _processSellInDate(item) {
  if (item.name != ItemTypes.LEGENDARY_ITEM) {
    item.sell_in = item.sell_in - 1;
  }
}

function _processQuality(item) {
  if (item.name == ItemTypes.AGED_BRIE || item.name == ItemTypes.CONCERT_PASSES) {
    increaseQualityIf(true, item);
  }
  else {
    decreaseQualityIf(item.name != ItemTypes.LEGENDARY_ITEM, item);
    decreaseQualityIf(item.name == ItemTypes.CONJURED_ITEM, item);
  }

  if (item.name == ItemTypes.CONCERT_PASSES) {
    increaseQualityIf(item.sell_in < 11, item);
    increaseQualityIf(item.sell_in < 6, item);
  }

  if (item.sell_in < 0) {
    _processAfterSellInDateQuality(item);
  }
}

function _processAfterSellInDateQuality(item) {
  if (item.name == ItemTypes.AGED_BRIE) {
    increaseQualityIf(true, item);
  }
  else if (item.name == ItemTypes.CONCERT_PASSES) {
    item.quality = 0;
  }
  else {
    decreaseQualityIf(item.name != ItemTypes.LEGENDARY_ITEM, item);
  }
}

function increaseQualityIf(condition, item) {
  if (condition && item.quality < 50) {
    item.quality = item.quality + 1;
  }
}

function decreaseQualityIf(condition, item) {
  if (condition && item.quality > 0) {
    item.quality = item.quality - 1;
  }
}

exports.Item = Item;
exports.global_items = items;
exports.update_quality = update_quality;
