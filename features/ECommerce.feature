Feature: ECommerce Main Flow Validations

    Scenario Outline: Place an Order
        Given Login to ECommerce Application with the "<username>" and "<password>"
        When Add "<productToChoose>" to cart
        Then Verify "<productToChoose>" is displayed in the cart
        When Enter the valid payment details and place the Order with:
            | field               | value |
            | creditCardNumber    | <creditCardNumber> |
            | creditCardExpiry    | <creditCardExpiry> |
            | creditCardCVV       | <creditCardCVV> |
            | creditCardHolderName | <creditCardHolderName> |
            | couponCode          | <couponCode> |
            | countrySequence     | <countrySequence> |
            | country             | <country> |
            | thankYouText        | <thankYouText> |
        Then Verify Order is present in the Order History Page

        Examples:
            | username | password | productToChoose | creditCardNumber | creditCardExpiry | creditCardCVV | creditCardHolderName | couponCode | countrySequence | country | thankYouText |
            | dhamaka@gmail.com | Dhamaka@123 | ZARA COAT 3 | 4542 9931 9292 2407 | 10/28 | 344 | Dhamaka | rahulshettyacademy | ind |  India | Thankyou for the order. |
            | dhamaka@gmail.com | Dhamaka@123 | iphone 13 pro | 4542 9931 9292 2408 | 09/27 | 345 | Dhamaka | rahulshettyacademy | net |  Netherlands | Thankyou for the order. |
            | dhamaka@gmail.com | Dhamaka@123 | ADIDAS ORIGINAL | 4542 9931 9292 2409 | 08/26 | 346 | Dhamaka | rahulshettyacademy | fin |  Finland | Thankyou for the order. |