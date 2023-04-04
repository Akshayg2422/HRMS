import React from 'react'
import { useNavigate } from 'react-router-dom'

function Policy() {
    let navigate = useNavigate()
    return (
        <>
            <footer class="footer pt-0 px-3">
                <div class="row align-items-center justify-content-lg-between">
                    <div class="col-lg-6">
                        <div class="copyright text-center  text-lg-left  text-muted">
                            © 2020 <a class="font-weight-bold ml-1">{'MAPLEBELL PRIVATE LIMITED'}</a>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <ul class="nav nav-footer justify-content-center justify-content-lg-end">
                            <li style={{
                                cursor: 'pointer'
                            }} onClick={() => { navigate('/RefundPolicy') }} data-toggle="modal" data-target="#exampleModal" class="nav-item">
                                <a class="nav-link" >Refund Policy</a>
                            </li>
                            <li style={{
                                cursor: 'pointer'
                            }} onClick={() => { navigate('/PrivacyPolicy') }} data-toggle="modal" data-target="#exampleModal" class="nav-item">
                                <a class="nav-link" >Privacy Policy</a>
                            </li>
                            <li style={{
                                cursor: 'pointer'
                            }} onClick={() => { navigate('/TermsOfUse') }} class="nav-item" data-toggle="modal" data-target="#termsModel"  >
                                <a class="nav-link" >Terms Of Use</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </footer>

        </>
    )
}

export default Policy