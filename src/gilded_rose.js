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
  LEGENDARY_ITEM : 'Sulfuras, Hand of Ragnaros'
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
  if (item.name != ItemTypes.AGED_BRIE && item.name != ItemTypes.CONCERT_PASSES) {
    if (item.quality > 0 && item.name != ItemTypes.LEGENDARY_ITEM) {
      item.quality = item.quality - 1;
    }
  }
  else {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
      if (item.name == ItemTypes.CONCERT_PASSES) {
        if (item.sell_in < 11 && item.quality < 50) {
          item.quality = item.quality + 1;
        }
        if (item.sell_in < 6 && item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }
  }

  if (item.sell_in < 0) {
    if (item.name != ItemTypes.AGED_BRIE) {
      if (item.name != ItemTypes.CONCERT_PASSES) {
        if (item.quality > 0 && item.name != ItemTypes.LEGENDARY_ITEM) {
          item.quality = item.quality - 1;
        }
      }
      else {
        item.quality = item.quality - item.quality;
      }
    }
    else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
  }
}

exports.Item = Item;
exports.global_items = items;
exports.update_quality = update_quality;
