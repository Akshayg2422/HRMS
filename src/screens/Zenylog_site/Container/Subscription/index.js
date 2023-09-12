import { Container } from 'reactstrap';
import { useState, useEffect } from 'react';
import './index.css'
import { ROUTE, goTo, useNav } from '@utils';


function Subscription() {

  const navigation = useNav();

  const [amountOneMonth, setAmountOneMonth] = useState(10);
  const [finalPayableOneMonth, setFinalPayableOneMonth] = useState(0);

  const [amountSixMonth, setAmountSixMonth] = useState(10);
  const [finalPayableSixMonth, setFinalPayableSixMonth] = useState(0);

  const [amountOneYear, setAmountOneYear] = useState(10);
  const [finalPayableOneYear, setFinalPayableOneYear] = useState(0);

  {/* Use useEffect to update final payable values when input values change */ }

  useEffect(() => {
    {/* Calculate and update final payable for one month */ }
    const calculateOneMonth = () => {
      const baseAmount = amountOneMonth * 30;
      const gstAmount = (baseAmount * 18) / 100;
      const finalAmount = baseAmount + gstAmount;
      setFinalPayableOneMonth(Math.round(finalAmount));
    };
    calculateOneMonth();
  }, [amountOneMonth]);

  useEffect(() => {
    {/* Calculate and update final payable for six months */ }
    const calculateSixMonth = () => {
      const baseAmount = amountSixMonth * 180;
      const discountAmount = (baseAmount * 10) / 100;
      const payableBeforeGST = baseAmount - discountAmount;
      const gstAmount = (payableBeforeGST * 18) / 100;
      const finalAmount = payableBeforeGST + gstAmount;
      setFinalPayableSixMonth(Math.round(finalAmount));
    };
    calculateSixMonth();
  }, [amountSixMonth]);

  useEffect(() => {
    {/* Calculate and update final payable for one year */ }
    const calculateOneYear = () => {
      const baseAmount = amountOneYear * 360;
      const discountAmount = (baseAmount * 25) / 100;
      const payableBeforeGST = baseAmount - discountAmount;
      const gstAmount = (payableBeforeGST * 18) / 100;
      const finalAmount = payableBeforeGST + gstAmount;
      setFinalPayableOneYear(Math.round(finalAmount));
    };
    calculateOneYear();
  }, [amountOneYear]);

  console.log('finalPayableSixMonthfinalPayableSixMonth', finalPayableSixMonth)


  const pricingOptions = [
    {
      title: 'Free Trial',
      price: 'FREE',
      amount: '1 JD',
      reports: ['Geo Fence Location', 'Attendance', 'Office Check-in'],
      onClick: () => { goTo(navigation, ROUTE.ROUTE_REGISTER, true); }
    },
    {
      title: '1 Month',
      price: '₹50',
      amount: '50 JD',
      reports: ['Geo Fence Location', 'Attendance', 'Office Check-in', 'Remote Check-in'],
      input: (
        <div className="input-container d-flex justify-content-between" style={{ fontSize: '12px' }}>
          <div className="inputContainer">
            <input required="required" id="inputField" placeholder={'No of Employees'} type="number" value={amountOneMonth} onChange={(e) => setAmountOneMonth(e.target.value)} />
            <label className="usernameLabel h5" for="inputField">No Of Employees</label>
            <svg viewBox="0 0 448 512" className="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
          </div>
        </div>
      ),
      paragraph: (
        <div className={'pt-2'} style={{ fontSize: '12px' }}>
          <div className={'d-flex justify-content-between'}>
            <h5 className=''>Base Amount: </h5>
            <div>
              <p>{`₹${amountOneMonth * 30}`}</p>
            </div>
          </div>
          <div className={'d-flex justify-content-between mt--2'}>
            <h5 className={''}>GST(18%): </h5>
            <div>
              <p>{`₹${((amountOneMonth * 30) * 0.18).toFixed()}`}</p>
            </div>
          </div>
          <div className={'d-flex justify-content-between mt--2'}>
            <h5>Total Payable:</h5>
            <div>
              <p>{`₹${finalPayableOneMonth}`}</p>
            </div>
          </div>
        </div>

      ),
      link: `https://zenyq.maplebellprivatelimited.in/authentication/payment/?name=subscription&amount=${finalPayableOneMonth}`
    },
    {
      title: '6 Months',
      price: '₹300',
      amount: '300 JD',
      reports: ['Geo Fence Location', 'Attendance', 'Office Check-in'],
      input: (
        <div className="input-container d-flex justify-content-between" style={{ fontSize: '12px' }}>
          <div className="inputContainer">
            <input required="required" id="inputField" placeholder={'No of Employees'} type="number" value={amountSixMonth} onChange={(e) => setAmountSixMonth(e.target.value)} />
            <label className="usernameLabel h5" for="inputField">No Of Employees</label>
            <svg viewBox="0 0 448 512" className="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
          </div>
        </div>
      ),
      paragraph: (
        <div className={'pt-2'} style={{ fontSize: '12px' }}>
          <div className={'d-flex justify-content-between'}>
            <h5>Base Amount:</h5>
            <div>
              <p>{`₹${(amountSixMonth * 180).toFixed()}`}</p>
            </div>
          </div>
          <div className={'d-flex justify-content-between mt--2'}>
            <h5 style={{ color: '#00f700' }}>Discount 10%:</h5>
            <div>
              <p>{`₹${((amountSixMonth * 180 * 0.1).toFixed())}`}</p>
            </div>
          </div>
          <div className={'d-flex justify-content-between mt--2'}>
            <h5>Payable:</h5>
            <div>
              <p>{`₹${((amountSixMonth * 180) - (amountSixMonth * 180 * 0.1)).toFixed()}`}</p>
            </div>
          </div>
          <div className={'d-flex justify-content-between mt--2'}>
            <h5>GST(18%):</h5>
            <div>
              <p>{`₹${(((amountSixMonth * 180) - (amountSixMonth * 180 * 0.1)) * 0.18).toFixed()}`}</p>
            </div>
          </div>
          <div className={'d-flex justify-content-between mt--2'}>
            <h5>Total Payable:</h5>
            <div>
              <p>{`₹${finalPayableSixMonth}`}</p>
            </div>
          </div>

        </div>
      ),
      link: `https://zenyq.maplebellprivatelimited.in/authentication/payment/?name=subscription&amount=${finalPayableSixMonth}`
    },
    {
      title: '1 Year',
      price: '₹400',
      amount: '400 JD',
      reports: ['Geo Fence Location', 'Attendance', 'Office Check-in', 'Remote Check-in'],
      input: (
        <div className="input-container d-flex justify-content-between" style={{ fontSize: '12px' }}>
          <div className="inputContainer">
            <input required="required" id="inputField" placeholder={'No of Employees'} type="number" value={amountOneYear} onChange={(e) => setAmountOneYear(e.target.value)} />
            <label className="usernameLabel h5" for="inputField">No Of Employees</label>
            <svg viewBox="0 0 448 512" className="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
          </div>
        </div>
      ),
      paragraph: (
        <div className={'pt-2'} style={{ fontSize: '12px' }}>
          <div className={'d-flex justify-content-between'}>
            <h5>Base Amount:</h5>
            <div>
              <p>{`₹${(amountOneYear * 360).toFixed()}`}</p>
            </div>
          </div>
          <div className={'d-flex justify-content-between mt--2'}>
            <h5 style={{ color: '#00f700' }}>Discount 25%:</h5>
            <div>
              <p>{`₹${((amountOneYear * 360 * 0.25).toFixed())}`}</p>
            </div>
          </div>
          <div className={'d-flex justify-content-between mt--2'}>
            <h5>Payable:</h5>
            <div>
              <p>{`₹${((amountOneYear * 360) - (amountOneYear * 360 * 0.25)).toFixed()}`}</p>
            </div>
          </div>
          <div className={'d-flex justify-content-between mt--2'}>
            <h5>GST(18%):</h5>
            <div>
              <p>{`₹${(((amountOneYear * 360) - (amountOneYear * 360 * 0.25)) * 0.18).toFixed()}`}</p>
            </div>
          </div>
          <div className={'d-flex justify-content-between mt--2'}>
            <h5>Total Payable:</h5>
            <div>
              <p>{`₹${finalPayableOneYear}`}</p>
            </div>
          </div>

        </div>
      ),
      link: `https://zenyq.maplebellprivatelimited.in/authentication/payment/?name=subscription&amount=${finalPayableOneYear}`
    },

  ];

  return (
    <Container fluid>
      <section style={{ backgroundColor: '#ffffff' }} className="pb-5" id="pricing-now-ui">

        <h1 className="card-header text-website-primary mx-6">Our <u>Pricing</u></h1>
        <div className=" position-relative">
          <div className="container pb-lg-8 pb-7 pt-4 postion-relative z-index-2 position-relative">
            <div className="row">
              <div className="col-md-7 mx-auto text-center">
                <span className="text-primary mb-2 h3">Pricing</span>
                <h3 className="text-black">Ready to get our subscription?</h3>
                <p className="custom-text-color">
                  Choose your subscription plan to unlock direct access to our team and explore the transformative potential of ZenyQ.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-lg-n8 mt-n6">
          <div className="container">
            <div className="row">
              {pricingOptions.map((option, index) => (
                <div className="col-lg-3 col-sm-6 mb-lg-0 mb-4" key={index}>
                  <div className="card h-100">
                    <div className={'text-sm-start text-center pt-4 pb-3 px-4'}>
                      <p className="font-weight-bold">{option.title}</p>
                    </div>
                    <hr className={`horizontal ${index % 2 === 0 ? 'light' : 'dark'} my-0`} />
                    <div className={'col'}>
                      {option.reports.map((each, subIndex) => (

                        <div className="card-body py-2" key={subIndex}>
                          <div className="row align-items-center">
                            <div
                              style={{
                                width: 10,
                                height: 10,
                                backgroundColor: '#0d6e78',
                                borderRadius: 5,
                              }}
                            ></div>
                            <div className="d-flex">
                              <div className="ps-3 ml-2">
                                <span className="text-sm custom-text-color">{each}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-sm-start text-center text-white pb-3 px-4">
                      <div className={'input-container'}>{option.input}</div>
                      <div className={'text-dark'}>{option.paragraph}</div>
                      {option.price === 'FREE' ? (
                        <div
                          className="custom-color border-0 col mt-1"
                          style={{
                            padding: '12px 15px',
                            borderRadius: '6px',
                            fontWeight: 'bold'
                          }}
                          onClick={option.onClick}
                        >
                          Try Now
                        </div>
                      ) : (
                        <a
                          href={option.link}
                          target="_blank" // This attribute opens the link in a new tab
                          rel="noopener noreferrer" // Added for security best practices
                          style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            display: 'block',
                            width: '100%',
                          }}
                        >
                          <div className="custom-color text-center text-white border-0 col mt-1"
                            style={{
                              padding: '12px 15px',
                              borderRadius: '6px',
                              fontWeight: 'bold'
                            }}
                          >
                            Buy Now
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </Container>
  );
}

export default Subscription
