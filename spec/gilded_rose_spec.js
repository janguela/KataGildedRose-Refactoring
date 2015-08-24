describe("Gilded Rose,", function() {

  describe("a product", function() {
    it("has a Name", function() {
      var name = "Crafted beer";
      var item = new Item(name, 0, 0);
      expect(item.name).toEqual(name);
    });

    it("has a Sell In value", function() {
      var sellInValue = 10;
      var item = new Item("", sellInValue, 0);
      expect(item.sell_in).toEqual(sellInValue);
    });

    it("has a Quality value", function() {
      var qualityValue = 20;
      var item = new Item("", 0, qualityValue);
      expect(item.quality).toEqual(qualityValue);
    });
  });

  describe("at the end of each day", function() {
    it("SellIn value is decreased by 1", function() {
      var sellInValue = 10;
      items = [new Item("Item", sellInValue, 10)];
      update_quality();
      expect(items[0].sell_in).toEqual(sellInValue - 1);
    });

    it("Quality value is decreased by 1", function() {
      var quality = 10;
      items = [new Item("Item", 10, quality)];
      update_quality();
      expect(items[0].quality).toEqual(quality - 1);
    });

    describe("once the sell by date has passed", function() {
      it("Quality degrades twice as fast", function () {
        var quality = 10;
        items = [new Item("Item", 0, 10)];
        update_quality();
        expect(items[0].quality).toEqual(quality - 2);
      });
    });

    describe("the 'Aged Brie'", function() {
      it("actually increases in Quality the older it gets", function () {
        var quality = 10;
        items = [new Item("Aged Brie", 10, quality)];
        update_quality();
        expect(items[0].quality).toEqual(quality + 1);
      });
    });

    describe("the Quality of an item", function() {
      it("is never negative", function() {
        var quality = 0;
        items = [new Item("Item", 0, quality)];
        update_quality();
        expect(items[0].quality).toEqual(0);
      });

      it("is never more than 50", function () {
        var quality = 50;
        items = [new Item("Aged Brie", 10, quality)];
        update_quality();
        expect(items[0].quality).toEqual(quality);
      });
    });

    describe("the 'Sulfuras' (legendary item)", function() {
      beforeEach(function () {
        this.sellIn = -1;
        items = [new Item("Sulfuras, Hand of Ragnaros", this.sellIn, 10)];
        update_quality();
      });

      it("never has to be sold", function () {
        expect(items[0].sell_in).toEqual(this.sellIn);
      });
    });
  });
});
