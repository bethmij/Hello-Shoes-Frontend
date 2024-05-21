
import {InputItem} from "../../components/shared/input.jsx";
import {Button} from "../../components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {ScrollArea} from "../../components/ui/scroll-area.jsx";
import {useParams} from "react-router-dom";
import {customerSchema, getCustomer} from "./formDetail/customer.jsx";
import {getEmployee} from "./formDetail/employee.jsx";
import {CgFormatRight} from "react-icons/cg";
import axios from "axios";
import {getSupplier} from "./formDetail/supplier.jsx";
import {getInventory} from "./formDetail/inventory.jsx"
import {getDetails, getNextID, saveDBData, updateDBData} from "../cart/cardDetail/fetchData.jsx";
import {useEffect, useState} from "react";
import aiGeneratedImage from '../../assets/ai-generated-8181045.jpg';
import {Input} from "../../components/ui/input.jsx";
import {Label} from "../../components/ui/label.jsx";
import {isAdmin, isAuthenticated} from "../auth/authentication.jsx";
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";

let buttonName = "";
let filePath = ""

 let schema;



function FormPage() {

    const [entityID, setEntityID] = useState("")
    const [entityList, setEntityList] = useState([])
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);



    const {id, action} = useParams()
    let form = ""
    let title = ""
    let url = ""
    let idName = ""


    useEffect(() => {
        if (id === "customer") {
            if (action.startsWith("save")) {
                getNextID("customer")
                    .then(code => {
                        setEntityID(code)
                    })

            } else if (action.startsWith("update")) {
                const customerID = action.split("update-")[1];
                getDetails("customer", customerID)
                    .then(items => {
                        setEntityList(items);
                    });
            }
        } else if (id === "employee") {
            if (action.startsWith("save")) {
                getNextID("employee")
                    .then(code => {
                        setEntityID(code)
                    })

            } else if (action.startsWith("update")) {
                const employeeCode = action.split("update-")[1];
                getDetails("employee", employeeCode)
                    .then(items => {
                        setEntityList(items);
                    });
            }
        } else if (id === "supplier") {
            if (action.startsWith("save")) {
                getNextID("supplier")
                    .then(code => {
                        setEntityID(code)
                    })

            } else if (action.startsWith("update")) {
                const supplierCode = action.split("update-")[1];
                getDetails("supplier", supplierCode)
                    .then(items => {
                        setEntityList(items);
                    });
            }
        } else if (id === "inventory") {
            if (action.startsWith("save")) {
                getNextID("inventory")
                    .then(code => {
                        setEntityID(code)
                    })

            } else if (action.startsWith("update")) {
                const inventoryCode = action.split("update-")[1];
                getDetails("inventory", inventoryCode)
                    .then(items => {
                        console.log(items)
                        setEntityList(items);
                    });
            }
        }
    }, [id, action]);

    const onSubmit = async (data, url) => {

        const token = localStorage.getItem('accessToken')
        data[idName] = entityID
        id === "employee" ? data.profilePic = filePath : data.itemPicture = filePath

        if (buttonName === "Submit") {
            await saveDBData(url, data, token,id.charAt(0).toUpperCase() + id.slice(1));

        } else if (buttonName === "Update") {
            Object.keys(entityList).forEach(key => {
                if (data[key] === "" || data[key] === "Gender" || data[key] === "Level" || data[key] === "Status" || data[key] === "Role" || data[key] === "Category") {
                    data[key] = entityList[key]
                }
            });
           await updateDBData(url, data, token,id)

        }
        reset()

    };


    if (id === "customer") {
        form = getCustomer(entityID, entityList);
        title = "Customer Form";
        url = "http://localhost:8080/app/customer";
        buttonName = action.startsWith("save") ? "Submit" : "Update"
        idName = "customerCode"
        schema = customerSchema

    } else if (id === "employee") {
        form = getEmployee(entityID, entityList)
        title = "Employee Form"
        url = "http://localhost:8080/app/employee"
        buttonName = action.startsWith("save") ? "Submit" : "Update"
        idName = "employeeCode"

    } else if (id === "supplier") {
        form = getSupplier(entityID, entityList)
        title = "Supplier Form"
        url = "http://localhost:8080/app/supplier"
        buttonName = action.startsWith("save") ? "Submit" : "Update"
        idName = "supplierCode"

    } else if (id === "inventory") {
        form = getInventory(entityID, entityList)
        title = "Inventory Form"
        url = "http://localhost:8080/app/inventory"
        buttonName = action.startsWith("save") ? "Submit" : "Update"
        idName = "itemCode"
    }

    const {register, handleSubmit, watch,  formState:{errors},reset, setValue} = useForm()

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add more if needed
            if (validTypes.includes(file.type)) {
                setSelectedFile(URL.createObjectURL(file));
                setError(null);
                const reader = new FileReader();
                reader.onloadend = () => {
                    filePath = reader.result

                };
                reader.readAsDataURL(file);
            } else {
                setSelectedFile(null);
                setError('Please select a valid image file (JPEG, PNG, or GIF).');
            }
        }
    };




    if ((id==="employee" || id==="supplier" || id==="inventory") && !isAdmin()) {
        return null;
    }

    return (
        <>
            <div className="absolute top-0 left-1/2 flex gap-x-5 -ms-32 mt-4 opacity-80">
                <CgFormatRight size="45"/>
                <h1 className="text-4xl ">{title}</h1>
            </div>


            <form className="w-4/5 h-4/5 ms-52 mt-32 flex-col rounded-full absolute "
                  onSubmit={handleSubmit(data => {
                      onSubmit(data, url)
                      reset()
                  })}>
                <ScrollArea className="h-full w-full rounded-3xl z-0 ">
                    <div className=" form w-full h-full absolute border-2 z-0 rounded-3xl opacity-100 "></div>
                    <div className="w-11/12 h-3 ms-12 border-t-2 bg-background  bermuda absolute z-50  "></div>


                    {form.map((formData, index) => (
                        <div key={index} className="flex justify-around mb-4 z-10">
                            {formData.map(data => (
                                <InputItem
                                    key={data.id}
                                    id={data.id}
                                    title={data.title}
                                    placeholder={data.placeholder}
                                    type={data.type}
                                    description={data.description}
                                    selectList={data.selectList}
                                    register={register}
                                    watch={watch}
                                    value={data.value}
                                    isEdit={data.isEdit}
                                    setValue={setValue}
                                    onChange={data.onChange}
                                    errors={errors}
                                    isRequired={data.required}
                                    requiredLength={data.requiredLength}
                                />

                            ))}

                        </div>
                    ))}

                    {(id === "employee" || id === "inventory")  && (
                        <div className="flex flex-row justify-around w-2/3 ms-48 items-center">

                            <div className="flex flex-col h-2/3 w-[20vw] ms-28 mb-20 z-50">
                                <Label htmlFor="picture" className="text-xl">Picture</Label>
                                <Input id="picture" type="file" onChange={handleFileChange} className="z-50"/>
                                <p className="opacity-60">Choose File</p>
                                {error && <p className="text-red-500">{error}</p>}
                            </div>

                            <div className="flex justify-center items-center h-2/3 mb-20">
                                {selectedFile && (
                                    <img
                                        id="profilePic"
                                        name="profilePic"
                                        {...register('profilePic')}
                                        src={selectedFile}
                                        alt="Selected Picture"
                                        className="z-50"
                                        style={{maxWidth: '300px', maxHeight: '400px'}}
                                    />
                                )}
                            </div>
                        </div>
                    )}

                </ScrollArea>

                <Button type="submit"
                        className=" w-2/12 h-12 absolute text-2xl text-opacity-40 -bottom-10 right-0 m-5 mt-10">{buttonName}</Button>
            </form>
        </>
    )

}

export default FormPage