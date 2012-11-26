/**
 * Amazon Wishlist, Extended - awe.js
 * 
 * Adds additional features to the Amazon Wishlist pages.
 * V1: Displays total cost of wishlist (including desired quantity, too).
*/

function ShowWishlistTotal() {
    var list = $("#item-page-wrapper .list-items table tbody .lineItemMainInfo .lineItemPart strong");
    var quantityList = $("#item-page-wrapper .list-items table tbody .lineItemOwnerInfoJS .quantityDisplay .quantityValueText");
    var total = 0;
    var totalItemsCount = 0;

    for (i = 0; i < list.length; i++) {
        var quantity = quantityList[i].innerText;
        var singleTotal = parseFloat(list[i].innerText.replace("$", ""));
        if (quantity !== " ")
        {
            singleTotal = singleTotal * quantity;
            totalItemsCount += quantity;
        }
        else
        {
            totalItemsCount++;
        }

        total += singleTotal;
    }

    var totalLabel = "<span style='color:#E47911; font-weight:bold; font-size: 20px'>You have {0} items "
                     + "({1} unique) totaling ${2}.</span>";
    totalLabel = totalLabel
        .replace("{0}", totalItemsCount)
        .replace("{1}", list.length)
        .replace("{2}", total.toFixed(2));

    $('.sortbarTopTable > tbody:last').append('<tr><td>' + totalLabel + '</td></tr>');
}

$(document).ready(function () {
    ShowWishlistTotal();
});