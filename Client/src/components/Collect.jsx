import { Button, Input, NativeSelect, Portal, Select } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { ColorModeButton } from "./ui/color-mode";


const Collect = () => {

    const [info, setInfo] = useState({ name: "", phoneNumber: "", address: "", city: "", state: "" });
    const frameworks = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(!loading);
    if(info.name=="" || info.phoneNumber==="" || info.address==="" || info.city==="" || info.state===""){
     toast.error("Fill all details");
     setLoading(false);
     return;
    }
    const response = await fetch(`http://localhost:5000/get`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name:info.name, phoneNumber:info.phoneNumber, address:info.address,city:info.city, state:info.state})
        })
        const resp = await response.json();
        if(!response.ok){
            toast.error(resp.message);
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.success("Successfully Submitted");

    }


    return (<>
 <div className="theme" style={{margin:"1%",display:"flex",justifyContent:"flex-end"}}><ColorModeButton/></div>
        <div className="outer">
            <div className="login-container">
                <h2 style={{ color: "white", fontWeight: "bold", fontSize: "xx-larger" }}></h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <Input className="idinput" maxLength={30} value={info.name}
                            onChange={(e) => setInfo(prev => ({ ...prev, name: e.target.value }))} />
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <Input className="idinput" maxLength={10} value={info.phoneNumber.trim()} onChange={(e) => {const val = e.target.value; if (/^\d*$/.test(val)) { setInfo((prev) => ({ ...prev, phoneNumber: val }));}}} />
                    </div>
                    <div className="form-group">
                        <label>Address:</label>
                        <Input className="idinput" maxLength={75} value={info.address} onChange={(e) => setInfo(prev => ({ ...prev, address: e.target.value }))} />
                    </div>
                    <div className="form-group">
                        <label>City:</label>
                        <Input className="idinput" maxLength={20} value={info.city} onChange={(e) => setInfo(prev => ({ ...prev, city: e.target.value }))} />
                    </div>
                    <div className="form-group">
                        <label>State:</label>
                        <NativeSelect.Root size="sm" width="240px">
                            <NativeSelect.Field placeholder="Select option" onChange={(e) => setInfo(prev => ({ ...prev, state: e.target.value }))}>
                                {frameworks.map((item,index)=>(
                                       <option value={item} key={index}>{item}</option>
                                ))}
                                
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                    </div>

                    <Button loading={loading} type="submit" className="loginbtn">Submit</Button>
                    <br />


                </form>
            </div>

        </div>


    </>)
}

export default Collect;