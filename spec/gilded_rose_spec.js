var GR = require('../src/gilded_rose');

describe("Gilded Rose,", function() {

  describe("a product", function() {
    it("has a Name", function() {
      var name = "Crafted beer";
      var item = new GR.Item(name, 0, 0);
      expect(item.name).toEqual(name);
    });

    it("has a Sell In value", function() {
      var sellInValue = 10;
      var item = new GR.Item("", sellInValue, 0);
      expect(item.sell_in).toEqual(sellInValue);
    });

    it("has a Quality value", function() {
      var qualityValue = 20;
      var item = new GR.Item("", 0, qualityValue);
      expect(item.quality).toEqual(qualityValue);
    });
  });

  describe("at the end of each day", function() {
    it("SellIn value is decreased by 1", function() {
      var sellInValue = 10;
      var items = [new GR.Item("Item", sellInValue, 10)];
      GR.update_quality(items);
      expect(items[0].sell_in).toEqual(sellInValue - 1);
    });

    it("Quality value is decreased by 1", function() {
      var quality = 10;
      var items = [new GR.Item("Item", 10, quality)];
      GR.update_quality(items);
      expect(items[0].quality).toEqual(quality - 1);
    });

    describe("once the sell by date has passed", function() {
      it("Quality degrades twice as fast", function () {
        var quality = 10;
        var items = [new GR.Item("Item", 0, 10)];
        GR.update_quality(items);
        expect(items[0].quality).toEqual(quality - 2);
      });
    });

    describe("the 'Aged Brie'", function() {
      it("actually increases in Quality the older it gets", function () {
        var quality = 10;
        var items = [new GR.Item("Aged Brie", 10, quality)];
        GR.update_quality(items);
        expect(items[0].quality).toEqual(quality + 1);
      });
    });

    describe("the Quality of an item", function() {
      it("is never negative", function() {
        var quality = 0;
        var items = [new GR.Item("Item", 0, quality)];
        GR.update_quality(items);
        expect(items[0].quality).toEqual(0);
      });

      it("is never more than 50", function () {
        var quality = 50;
        var items = [new GR.Item("Aged Brie", 10, quality)];
        GR.update_quality(items);
        expect(items[0].quality).toEqual(quality);
      });
    });

    describe("the 'Sulfuras' (legendary item)", function() {
      beforeEach(function () {
        this.sellIn = 9999;
        this.quality = 50;
        this.items = [new GR.Item("Sulfuras, Hand of Ragnaros", this.sellIn, this.quality)];
        GR.update_quality(this.items);
      });

      it("never has to be sold", function () {
        expect(this.items[0].sell_in).toEqual(this.sellIn);
      });

      it("never decreases in Quality", function () {
        expect(this.items[0].quality).toEqual(this.quality);
      });
    });

    describe("the 'Backstage passes'", function() {
      it("(like aged brie) increases in Quality as it's Sell In value approaches", function () {
        var sellIn = 30;
        var quality = 10;
        var items = [new GR.Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality)];
        GR.update_quality(items);
        expect(items[0].quality).toEqual(quality + 1);
      });

      it("Quality increases by 2 when there are 10 days or less left", function () {
        var sellIn = 10;
        var quality = 10;
        var items = [new GR.Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality)];
        GR.update_quality(items);
        expect(items[0].quality).toEqual(quality + 2);
      });

      it("Quality increases by 3 when there are 5 days or less left", function () {
        var sellIn = 5;
        var quality = 10;
        var items = [new GR.Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality)];
        GR.update_quality(items);
        expect(items[0].quality).toEqual(quality + 3);
      });

      it("Quality drops to 0 after the concert", function () {
        var sellIn = 0;
        var quality = 10;
        var items = [new GR.Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality)];
        GR.update_quality(items);
        expect(items[0].quality).toEqual(0);
      });
    });
  });
});
