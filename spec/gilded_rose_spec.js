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

    describe("SellIn value", function() {
      it("is decreased by 1", function() {
        var sellInValue = 10;
        GR.global_items = [new GR.Item("Item", sellInValue, 10)];
        GR.global_items = GR.update_quality(GR.global_items);
        expect(GR.global_items[0].sell_in).toEqual(sellInValue - 1);
      });
    });

    describe("Quality value", function() {
      it("Quality value is decreased by 1", function() {
        var quality = 10;
        GR.global_items = [new GR.Item("Item", 10, quality)];
        GR.global_items = GR.update_quality(GR.global_items);
        expect(GR.global_items[0].quality).toEqual(quality - 1);
      });

      describe(", once the sell by date has passed,", function() {
        beforeEach(function() {
          this.sellIn = 0;
        });

        it("degrades twice as fast", function () {
          var quality = 10;
          GR.global_items = [new GR.Item("Item", this.sellIn, quality)];
          GR.global_items = GR.update_quality(GR.global_items);
          expect(GR.global_items[0].quality).toEqual(quality - 2);
        });

        it("degrades twice as fast but never below 0", function () {
          var quality = 1;
          GR.global_items = [new GR.Item("Item", this.sellIn, quality)];
          GR.global_items = GR.update_quality(GR.global_items);
          expect(GR.global_items[0].quality).toEqual(0);
        });
      });
    });

    describe("the 'Aged Brie'", function() {
      it("actually increases in Quality the older it gets", function () {
        var quality = 10;
        GR.global_items = [new GR.Item("Aged Brie", 10, quality)];
        GR.global_items = GR.update_quality(GR.global_items);
        expect(GR.global_items[0].quality).toEqual(quality + 1);
      });

      it("increases in Quality by 2 after the Sell In date", function () {
        var quality = 10;
        GR.global_items = [new GR.Item("Aged Brie", -10, quality)];
        GR.global_items = GR.update_quality(GR.global_items);
        expect(GR.global_items[0].quality).toEqual(quality + 2);
      });
    });

    describe("the Quality of an item", function() {
      it("is never negative", function() {
        var quality = 0;
        GR.global_items = [new GR.Item("Item", 0, quality)];
        GR.global_items = GR.update_quality(GR.global_items);
        expect(GR.global_items[0].quality).toEqual(0);
      });

      it("is never more than 50", function () {
        var quality = 50;
        GR.global_items = [new GR.Item("Aged Brie", 10, quality)];
        GR.global_items = GR.update_quality(GR.global_items);
        expect(GR.global_items[0].quality).toEqual(quality);
      });

      it("is never more than 50 (even after the Sell In date)", function () {
        var quality = 50;
        GR.global_items = [new GR.Item("Aged Brie", -10, quality)];
        GR.global_items = GR.update_quality(GR.global_items);
        expect(GR.global_items[0].quality).toEqual(quality);
      });
    });

    describe("the 'Sulfuras' (legendary item)", function() {
      beforeEach(function () {
        this.sellIn = -9999;
        this.quality = 80;
        GR.global_items = [new GR.Item("Sulfuras, Hand of Ragnaros", this.sellIn, this.quality)];
        GR.global_items = GR.update_quality(GR.global_items);
      });

      it("never has to be sold", function () {
        expect(GR.global_items[0].sell_in).toEqual(this.sellIn);
      });

      it("never decreases in Quality", function () {
        expect(GR.global_items[0].quality).toEqual(this.quality);
      });
    });

    describe("the 'Backstage passes'", function() {
      it("(like aged brie) increases in Quality as it's Sell In value approaches", function () {
        var sellIn = 30;
        var quality = 10;
        GR.global_items = [new GR.Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality)];
        GR.global_items = GR.update_quality(GR.global_items);
        expect(GR.global_items[0].quality).toEqual(quality + 1);
      });

      it("Quality increases by 2 when there are 10 days or less left", function () {
        var sellIn = 10;
        var quality = 10;
        GR.global_items = [new GR.Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality)];
        GR.global_items = GR.update_quality(GR.global_items);
        expect(GR.global_items[0].quality).toEqual(quality + 2);
      });

      it("Quality doesn't increase above 50", function () {
        var sellIn = 2;
        var quality = 49;
        GR.global_items = [new GR.Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality)];
        GR.global_items = GR.update_quality(GR.global_items);
        expect(GR.global_items[0].quality).toEqual(50);
      });

      it("Quality increases by 3 when there are 5 days or less left", function () {
        var sellIn = 5;
        var quality = 10;
        GR.global_items = [new GR.Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality)];
        GR.global_items = GR.update_quality(GR.global_items);
        expect(GR.global_items[0].quality).toEqual(quality + 3);
      });

      it("Quality drops to 0 after the concert", function () {
        var sellIn = 0;
        var quality = 10;
        GR.global_items = [new GR.Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality)];
        GR.global_items = GR.update_quality(GR.global_items);
        expect(GR.global_items[0].quality).toEqual(0);
      });
    });
  });
});
