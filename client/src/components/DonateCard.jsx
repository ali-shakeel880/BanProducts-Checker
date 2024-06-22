


const DonateCard=()=>{
    
    return(

<section className="py-8 pl-5">
    <div className="container">
        <div className="flex flex-col md:flex-row md:gap-20 md:items-center">
            <div className="w-full md:w-6/12 mb-8 md:mb-0">
                <div className="w-full h-full bg-orange-200 rounded-md overflow-hidden">
                    <img className="w-full object-cover" src="https://boycott-israel.org/img/jabalia.webp" width="1200" height="818" alt="Jabalia camp bombed"/>
                </div>
            </div>
            <div className="w-full md:w-6/12">
                <p className="text-lg md:text-xl uppercase font-bold text-orange-500 mb-2 md:mb-4">Palestinians need you</p>
                <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-5 text-black">Emergency Relief for Gaza</h2>
                <p className="text-base leading-relaxed text-gray-500 mb-5">A complete siege has cut off all access to food, water, fuel, and electricity, affecting 2.3 million people. Gaza's only power plant has shut down, plunging the region into darkness. Hospital generators run on limited fuel, and medical staff have warned that it's running out. The situation is critical, with lives, especially those dependent on life-support equipment, hanging in the balance.</p>
                <a href="https://buy.stripe.com/test_6oEcPe96e6xP2fm6oo">
                <button className="bg-emerald-600  hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
 Donate Now
</button></a>
            </div>
        </div>
    </div>
</section>

)}
export default DonateCard;