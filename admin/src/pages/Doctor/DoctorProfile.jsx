import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import {AppContext} from "../../context/AppContext";
const DoctorProfile = () => {
    const {dToken ,profileData,setProfileData,getProfileData}=useContext(DoctorContext);
    const {backendUrl}=useContext(AppContext);
    useEffect(()=>{
        if(dToken){
            getProfileData();
        }
    },[dToken])
    return profileData && (
        <div>
            <div className='flex flex-col gap-4 m-5'>
                <div >
                    <img className="bg-[#5f6FFF] w-full sm:max-w-64 rounded-lg" src={profileData.image} alt="" />
                </div>
                <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
                    <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{profileData.name}</p>
                    <div className="flex items-center gap-2 mt-1 text-gray-600 ">
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className="py-0.5 px-2 border text-xs rounded-full">{profileData.experience}</button>
                    </div>
                    <div>
                        <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">About:</p>
                        <p className="text-sm text-gray-600 max-w-[700px] mt-1">{profileData.about}</p>
                    </div>
                    <p className="text-gray-600 font-medium mt-4 mb-2">Appointment fee: <span className="text-gray-800">₹ {profileData.fees}</span></p>
                    <div className="flex gap-2 py-2">
                        <p>Address:</p>
                        <p className="text-sm">{profileData.address.line1}
                            <br />
                            {profileData.address.line2}
                        </p>
                    </div>
                    <div className="flex gap-1 pt-2">
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="">Available</label>
                    </div>
                    <button className="px-4 py-1 border border-[#5f6FFF] text-sm rounded-full mt-5 hover:bg-[#5f6FFF] hover:text-white transition-all">Edit</button>
                </div>
            </div>
        </div>
    );
}

export default DoctorProfile;
