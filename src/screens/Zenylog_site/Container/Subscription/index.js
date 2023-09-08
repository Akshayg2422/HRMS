import { useNav } from '@utils';
import { Container } from 'reactstrap';
import './index.css'
import { useState, useEffect } from 'react';


function Subscription() {

  const [amountOneMonth, setAmountOneMonth] = useState(10);
  const [finalPayableOneMonth, setFinalPayableOneMonth] = useState(0);

  const [amountSixMonth, setAmountSixMonth] = useState(10);
  const [finalPayableSixMonth, setFinalPayableSixMonth] = useState(0);

  const [amountOneYear, setAmountOneYear] = useState(10);
  const [finalPayableOneYear, setFinalPayableOneYear] = useState(0);

  // Calculate and update final payable for one month
  const calculateOneMonth = () => {
    const baseAmount = amountOneMonth * 30;
    const gstAmount = (baseAmount * 18) / 100;
    const finalAmount = baseAmount + gstAmount;
    setFinalPayableOneMonth(Math.round(finalAmount));
  };

  // Calculate and update final payable for six months
  const calculateSixMonth = () => {
    const baseAmount = amountSixMonth * 180;
    const discountAmount = (baseAmount * 10) / 100;
    const payableBeforeGST = baseAmount - discountAmount;
    const gstAmount = (payableBeforeGST * 18) / 100;
    const finalAmount = payableBeforeGST + gstAmount;
    setFinalPayableSixMonth(Math.round(finalAmount));
  };

  // Calculate and update final payable for one year
  const calculateOneYear = () => {
    const baseAmount = amountOneYear * 360;
    const discountAmount = (baseAmount * 25) / 100;
    const payableBeforeGST = baseAmount - discountAmount;
    const gstAmount = (payableBeforeGST * 18) / 100;
    const finalAmount = payableBeforeGST + gstAmount;
    setFinalPayableOneYear(Math.round(finalAmount));
  };

  // Use useEffect to update final payable values when input values change
  useEffect(() => {
    calculateOneMonth();
  }, [amountOneMonth]);

  useEffect(() => {
    calculateSixMonth();
  }, [amountSixMonth]);

  useEffect(() => {
    calculateOneYear();
  }, [amountOneYear]);

  console.log('finalPayableSixMonthfinalPayableSixMonth',finalPayableSixMonth)


  const pricingOptions = [
    {
      title: 'Free Trial',
      price: 'FREE',
      amount: '1 JD',
      reports: ['Geo Fence Location', 'Attendance', 'Office Check-in'],
      // onClick: () => { goTo(ROUTES['auth-module'].login) }
    },
    {
      title: '1 Month',
      price: '₹50',
      amount: '50 JD',
      reports: ['Geo Fence Location', 'Attendance', 'Office Check-in', 'Remote Check-in'],
      input: <div className="">
        <input
          type="number"
          value={amountOneMonth}
          onChange={(e) => setAmountOneMonth(e.target.value)}
        />
        <span>No of Employees</span>
      </div>,
      paragraph: <p>Final Payable (One Month): {finalPayableOneMonth}</p>,
      link: `https://mockeazyprimary.leorainfotech.in/authentication/payment/?name=subscription&amount=${finalPayableOneMonth}`
    },
    {
      title: '6 Months',
      price: '₹300',
      amount: '300 JD',
      reports: ['Geo Fence Location', 'Attendance', 'Office Check-in', 'Remote Check-in', 'Time Sheets'],
      input: <div className="">
        <input
          type="number"
          value={amountSixMonth}
          onChange={(e) => setAmountSixMonth(e.target.value)}
        />
        <span>No of Employees</span>
      </div>,
      paragraph: <p>Final Payable (One Month): {finalPayableSixMonth}</p>,
      link: `https://mockeazyprimary.leorainfotech.in/authentication/payment/?name=subscription&amount=${finalPayableSixMonth}`
    },
    {
      title: '1 Year',
      price: '₹400',
      amount: '400 JD',
      reports: ['Geo Fence Location', 'Attendance', 'Office Check-in', 'Remote Check-in', 'Time Sheets', 'Pay Slips', 'View Timesheets'],
      input: <div className="">
        <input
          type="number"
          value={amountOneYear}
          onChange={(e) => setAmountOneYear(e.target.value)}
        />
        <span>No of Employees</span>
      </div>,
      paragraph: <p>Final Payable (One Month): {finalPayableOneYear}</p>,
      link: `https://mockeazyprimary.leorainfotech.in/authentication/payment/?name=subscription&amount=${finalPayableOneYear}`
    },
  ];

  return (
    <Container fluid>
      <section style={{ backgroundColor: '#ffffff' }} className="pb-5" id="pricing-now-ui">

        <h1 className="card-header text-website-primary">Contact{' '}<u>us</u></h1>
        <div className=" position-relative">
          <div className="container pb-lg-8 pb-7 pt-4 postion-relative z-index-2 position-relative">
            <div className="row">
              <div className="col-md-7 mx-auto text-center">
                <span className="text-primary mb-2 h3">Pricing</span>
                <h3 className="text-black">Ready to get our subscription?</h3>
                <p className="custom-text-color">
                  Based on the license you get, you will have direct access to our team <br /> learn more about ZenyQ.
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
                      {/* <h2 className="font-weight-bold mt--2">{option.price}</h2> */}
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
                      {/* <div>
                                            <img className={'mb-1'} src={Icons} alt="..." height={60} width={60} />
                                            <p className="mb-1">{option.amount}</p>
                                        </div> */}
                      <div className={''}>{option.input}</div>
                      <div className={'text-black'}>{option.paragraph}</div>
                      {option.price === 'FREE' ? (
                        <div
                          className="custom-btn custom-color  border-0 col mt-1"

                        // onClick={option.onClick}
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
                          <div className="custom-btn custom-color text-center text-white border-0 col mt-1">
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
