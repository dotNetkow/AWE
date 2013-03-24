/**
 * Amazon Wishlist, Extended - awe.js
 * created by Matt Netkow
 * 
 * Adds additional features to the Amazon Wishlist pages.
*/
(function(awe, $) {

    awe.showWishlistTotals = function () {
        var list = $("#item-page-wrapper .list-items table tbody .lineItemMainInfo");
        var quantityList = $("#item-page-wrapper .list-items table tbody .lineItemOwnerInfoJS .quantityDisplay .quantityValueText");
        var total = 0;
        var totalItemsCount = 0;
        var currencyChar;

        for (i = 0; i < list.length; i++) {
            var singleTotal;
            var normalEntry = $(list[i]).find('.lineItemPart strong');
            if (normalEntry.length >= 1) {
                // Amazon sells the item
                singleTotal = normalEntry[0].innerText;
            }
            else {
                // Amazon doesn't sell the item - aka "Available from these sellers"
                var availFromSellersEntry = $(list[i]).find('.price span');
                singleTotal = availFromSellersEntry[0].innerText;
            }

            // determine currency by stripping out 1st character of 1st wishlist item and saving it
            if (currencyChar === undefined) { currencyChar = singleTotal.charAt(0); }
            var tot = parseFloat(singleTotal.replace(currencyChar, ""));

            var quantity = quantityList[i].innerText;
            if (quantity !== " ") {
                var quantityNum = parseInt(quantity);
                tot = tot * quantityNum;
                totalItemsCount += quantityNum;
            }
            else {
                totalItemsCount++;
            }

            total += tot;
        }

        // create the container that holds all AWE content
        var aweContainer =
            $("<div id='aweMain'></div>")
                .css('color', '#E47911')
                .css('border-style', 'dashed')
                .css('border-width', '1px')
                .css('padding', '5px');

        // set styles
        var totalSpan =
            $('<span/>')
                .css('font-weight', 'bold')
                .css('font-size', '20px');

        // set message - aka "2 items (1 unique) totaling $118.54."
        var totalMessage = "{0} {1} ({2} unique) totaling {3}{4}.";
        totalMessage = totalMessage
            .replace("{0}", totalItemsCount)
            .replace("{1}", totalItemsCount > 1 ? "items" : "item")
            .replace("{2}", list.length)
            .replace("{3}", currencyChar)
            .replace("{4}", total.toFixed(2));
        totalSpan.text(totalMessage);

        var aweLink = "<p>Brought to you by <a style='text-decoration: underline;' target='_blank' " +
            "href='https://chrome.google.com/webstore/detail/amazon-wishlist-extender/gdihocbpekafjgglddhamgipifhmamgf'>awe</a></p>";
        var aweSection =
            $(aweLink)
                .css('color', '#124C90')
                .css('font-size', '10px')
                .css('text-align', 'right')
                .css('margin', '0px')
                .css('padding-top', '5px');

        $(aweContainer).append(totalSpan);
        $(aweContainer).append(aweSection);
        $('.sortbarTopTable > tbody:last').append(aweContainer);
    };

}(window.awe = window.awe || {}, jQuery));

$(document).ready(function () {
    awe.showWishlistTotals();
});