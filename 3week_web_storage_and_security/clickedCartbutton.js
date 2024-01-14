fuction clickedCartButton(){
    // 1. gtag 발행해서 ="장바구니에 123 상품을 추가했다. " 행동 트래킹(gtag 로직)
    gtag.send('cart', 123)
    //Post https:// www.googletagmanger.com?UID_123jdas?type=cart&id=123
    //Requset " Cookie" Header : userId = 123c
    //Domain: www.googletagmanager.com
    //Path: /

    //2. Move to Cart, Add to Cart(자체 로직)
    fetch('POST', 'api.aaron.com/cart', 123)
    //POST https://api.arron.com/cart?id=123
    //Domain: api.arron/com
    //Path: /

}

@RestController
public cartController{
    @PostMapping('cart', 123)
}