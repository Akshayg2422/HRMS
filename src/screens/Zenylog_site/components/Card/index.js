
const Card=(props)=>{
    

    return (
        <>
              <div class="card card-rounded card2">
                <div class="card-body text-center">
                <img  src={props.image} height={"45px"} width={"40px"} alt="Card image cap"></img>
                  <h4 class="card-title mt-3 mb-0 text-website-primary">{props.title}</h4>
                  <p class="card-text m-0 p-0">
                  {props.text1}<br/>{props.text2}<br/>{props.text3}<br/>{props.text4}
                  </p>
                </div>
              </div>
            
        </>
    )
}

export default Card;