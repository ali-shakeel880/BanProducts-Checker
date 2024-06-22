import React from "react"
import {Link} from "react-router-dom"
import image from '../images/logo.png'
import facebook from '../images/facebook.png'
import email from '../images/email.png'


const Footer = () => {
  return (
    <footer class="bg-gradient-to-r from-rose-700 via-nutral-900 to-lime-800 mt-10">
  <div class="container mx-auto">
    <div class="flex flex-col md:flex-row mb-8 md:mb-12">
      <div class="basis-full md:basis-6/12">
        <Link class="logo" to="/">
          <img class="logo" src={image} width="142" height="42" alt="Boycott-Israel.org logo"/>
        </Link>
      </div>
    </div>
  </div>
  <div class="container mx-auto">
    <h2 class="text-2xl md:text-5xl font-sans font-semibold md:leading-tight mb-8 pb-8 md:mb-14 md:pb-12 border-b-2 border-b-emerald-700 text-emerald-100 text-center">
      Support Change by Boycotting Firms with Significant Activities in Israel to Ease Suffering
    </h2>
  </div>
  <div class="container mx-auto">
    <div class="flex flex-col xl:flex-row mb-14">
      <div class="basis-full flex items-center xl:basis-6/12 mb-9 xl:mb-0 xl:pb-0 border-b-2 border-b-emerald-700 md:border-none">
        <div class=" flex space-x-12 footer--nav mb-8 md:mb-0">
          <Link class="block md:inline-block mb-3 md:mb-0 text-white" to="/">Home</Link>
          <Link class="block md:inline-block mb-3 md:mb-0 text-white" to="/productpage">Products</Link>
          
          <Link class="block md:inline-block mb-3 md:mb-0 text-white" to="/donate-now">Donate Now</Link>
          <Link class="block md:inline-block mb-3 md:mb-0 text-white" to="/contact">Contact Us</Link>
         
        </div>
      </div>
      <div class="basis-full xl:basis-6/12 flex flex-col xl:flex-row xl:items-center xl:justify-end">
        <Link class="font-bold relative mb-2 xl:mb-0 " to="mailto:alimayo880@gmail.com">
         
          <span class="relative top-[2px] text-white">alimayo880@gmail.com</span>
        </Link>
        <div class="flex flex-row mt-3 xl:mt-0">
          <Link class="invert xl:ml-8 relative -left-[2px] xl:left-0" to="https://www.facebook.com/profile.php?id=61553279494437" target="_blank">
            <img  width="42" height="42" src={facebook} alt="Facebook icon"/>
          </Link>
          {/* <Link class="invert ml-2 relative -left-[2px] xl:left-0" to="https://www.instagram.com/boycott_israel_org/" target="_blank">
            <img src="img/icons/icon-instagram.svg" alt="Instagram icon"/>
          </Link>
          <Link class="invert ml-2 relative -left-[2px] xl:left-0" to="https://www.tiktok.com/@boycott_israel_org" target="_blank">
            <img src="img/icons/icon-tiktok.svg" alt="Tiktok icon"/>
          </Link> */}
        </div>
      </div>
    </div>
  </div>
  <div class="bg-gradient-to-r from-rose-700 via-nutral-900 to-lime-800  pb-8 mx-8 text-emerald-100">
      <div class="container">
        <div class="flex flex-col md:flex-row md:gap-20 md:items-center">
          <div class="basis-full md:basis-6/12 mb-4 md:mb-0">
            <p class="opacity-70">Boycott Israel </p>
          </div>
          <div class="basis-full md:basis-6/12 md:text-right">
            <p class="opacity-70"> Copyright © 2024 | All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
</footer>

  );
};

export default Footer;
