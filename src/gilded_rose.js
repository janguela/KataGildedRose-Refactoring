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
    if (items[i].name != ItemTypes.AGED_BRIE && items[i].name != ItemTypes.CONCERT_PASSES) {
      if (items[i].quality > 0) {
        if (items[i].name != ItemTypes.LEGENDARY_ITEM) {
          items[i].quality = items[i].quality - 1
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        if (items[i].name == ItemTypes.CONCERT_PASSES) {
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
        }
      }
    }
    if (items[i].name != ItemTypes.LEGENDARY_ITEM) {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (items[i].name != ItemTypes.AGED_BRIE) {
        if (items[i].name != ItemTypes.CONCERT_PASSES) {
          if (items[i].quality > 0) {
            if (items[i].name != ItemTypes.LEGENDARY_ITEM) {
              items[i].quality = items[i].quality - 1
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }
  return items;
}

exports.Item = Item;
exports.global_items = items;
exports.update_quality = update_quality;
