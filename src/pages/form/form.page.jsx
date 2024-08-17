import {useRef, useState} from "react";
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
import {useEffect} from "react";
import aiGeneratedImage from '../../assets/img/ai-generated-8181045.jpg';
import {Input} from "../../components/ui/input.jsx";
import {Label} from "../../components/ui/label.jsx";
import {isAdmin, isAuthenticated} from "../auth/authentication.jsx";
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import {WebCamPic} from "../../components/shared/WebCamPic.jsx";
import Tables from "../../components/shared/table.jsx";
import {sizeTableColumns} from "./formDetail/inventorySizeTable.jsx";

let buttonName = "";
let filePath = ""


function FormPage() {

    const [entityID, setEntityID] = useState("")
    const [entityList, setEntityList] = useState([])
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);
    const {register, handleSubmit, reset, watch, formState: {errors}, setValue} = useForm()
    const [resetForm, setResetForm] = useState(false);
    const [supplierCodes, setSupplierCodes] = useState([])
    const [supplierName, setSupplierName] = useState()
    const [tableData, setTableData] = useState([]);
    const [itemSize, setItemSize] = useState("")
    const [itemQuantity, setItemQuantity] = useState("")

    const {id, action} = useParams()
    let form = ""
    let title = ""
    let url = ""
    let idName = ""
    const sizeRange = ["XS", "S", "M", "L", "XL"]

    const fileInputRef = useRef(null);

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
                // getNextID("inventory")
                //     .then(code => {
                //         setEntityID(code)
                //     })
                getDetails("supplier", "getIDs").then(codes => {
                    setSupplierCodes(codes)
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

        setResetForm(false)

        if(id !== "inventory") {
            data[idName] = entityID
        }
        id === "employee" ? data.profilePic = filePath : data.itemPicture = filePath




        if (buttonName === "Submit") {

            if(id === "inventory"){
                let itemSizeList = {}
                tableData.map((item) => {
                    itemSizeList[item.size.toString()] = item.itemQuantity.toString();
                });
                data.itemSizeList = itemSizeList;
            }

            await saveDBData(url, data, id.charAt(0).toUpperCase() + id.slice(1), () => {
                setResetForm(true)
                getNextID(id)
                    .then(code => {
                        setEntityID(code)
                    })
                setSelectedFile(null)
                setTableData([])
            });


        } else if (buttonName === "Update") {
            Object.keys(entityList).forEach(key => {
                if (data[key] === "" || data[key] === "Gender" || data[key] === "Level" || data[key] === "Status" || data[key] === "Role" || data[key] === "Category") {
                    data[key] = entityList[key]
                }
            });
            if(id === "inventory"){
                let itemSizeList = {}
                tableData.map((item) => {
                    itemSizeList[item.size.toString()] = item.itemQuantity.toString();
                });
                data.itemSizeList = itemSizeList;
            }
            await updateDBData(url, data, id, () => {
                    setSelectedFile(null)
                    setResetForm(true)
                }
            )
        }


    }


    if (id === "customer") {
        form = getCustomer(entityID, entityList);
        title = "Customer Form";
        url = "http://localhost:8080/app/customer";
        buttonName = action.startsWith("save") ? "Submit" : "Update"
        idName = "customerCode"

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
        form = getInventory(entityID, entityList, supplierCodes, supplierName, setSupplierName)
        title = "Inventory Form"
        url = "http://localhost:8080/app/inventory"
        buttonName = action.startsWith("save") ? "Submit" : "Update"
        idName = "itemCode"

    }


    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (validTypes.includes(file.type)) {
                setSelectedFile(URL.createObjectURL(file));
                setError(null);
                const reader = new FileReader();
                reader.onloadend = () => {
                    filePath = reader.result
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                };
                reader.readAsDataURL(file);
            } else {
                setSelectedFile(null);
                setError('Please select a valid image file (JPEG, PNG, or GIF).');
            }
        }
    };


    // if ((id === "employee" || id === "supplier" || id === "inventory") && !isAdmin()) {
    //     return null;
    // }

    function setTable() {

        if (!isNaN(itemQuantity)) {
            let existingItem = [...tableData]
            let index = existingItem.findIndex((item) => item.size === itemSize);

            if (index !== -1) {
                existingItem[index].itemQuantity = itemQuantity;

            } else {
                const itemData = { size: itemSize.toString(), itemQuantity: itemQuantity };
                existingItem.push(itemData)
            }
            setTableData(existingItem)

        }
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
                  })}>
                <ScrollArea className="h-full w-full rounded-3xl z-0 ">
                    <div className=" form w-full h-full absolute border-2 -z-50 rounded-3xl opacity-100 "></div>
                    <div className="w-11/12 h-3 ms-12 border-t-2 bg-background  -z-50 bermuda absolute "></div>
                            {/*<div className="z-50">*/}
                            {/*    <input {...register("para")} id="para" type="text" name="para" placeholder="sfasfasfasfasf"*/}
                            {/*           className="z-50 w-72 h-32"></input>*/}
                            {/*</div>*/}

                            {form.map((formData, index) => (
                                <div key={index} className="flex justify-around mb-4 z-10">
                                    {formData.map(data => (
                                        <div key={data.id} className=" z-50 w-2/5">
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
                                                resetForm={resetForm}

                                            />
                                        </div>

                                    ))}

                                </div>
                            ))}

                    {(id === "employee" || id === "inventory") && (

                        <div className="flex flex-row justify-around w-full mt-20 items-center z-50 ">
                            <div className="flex flex-row justify-between items-center w-3/5 mb-20">
                                <div className="flex flex-col w-1/3 z-50 ms-32 ">
                                    <Label htmlFor="picture" className="text-xl">Picture</Label>
                                    <Input id="picture" type="file" onChange={handleFileChange} ref={fileInputRef} />
                                    <p className="opacity-60">Choose File</p>
                                    {error && <p className="text-red-500">{error}</p>}
                                </div>

                                <div className="flex justify-center items-center w-2/3 mb-20">
                                    {selectedFile && (
                                        <img
                                            id="profilePic"
                                            name="profilePic"
                                            {...register('profilePic')}
                                            src={selectedFile}
                                            alt="Selected Picture"
                                            className="z-50"
                                            style={{ maxWidth: '400px', maxHeight: '400px' }}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="w-[15vw] z-50 -ms-36 me-20">
                                <WebCamPic setImg={setSelectedFile}  resetForm={resetForm}/>
                            </div>
                        </div>
                    )}

                    {id === "inventory" && (

                        <div className=" w-full flex flex-row justify-between">

                            <form className=" w-1/2 h-2/3 flex flex-col   items-center">

                                <div className="w-2/3">
                                    <InputItem id={"size"} title={"Item Size"} type={"select"} register={register} resetForm={resetForm}
                                               setValue={setValue} selectList={sizeRange} onChange={(event) => {
                                                   setItemSize(event.target.value)
                                    }}/>
                                </div>
                                <div className="w-2/3">
                                    <InputItem id={"quantity"} title={"Item Quantity"} type={"number"} resetForm={resetForm}
                                               register={register} onChange={(event) => {
                                        setItemQuantity(event.target.value)
                                    }}/>
                                </div>
                                <Button type="submit" className="text-lg w-2/5 mt-5 " onClick={(event) => {
                                    event.preventDefault()
                                    setTable()
                                }}>Add sizes</Button>

                            </form>
                            <div className=" w-1/2 h-2/3 flex flex-row align-middle items-center justify-center ">
                                <div className="w-2/3">
                                    <Tables columns={sizeTableColumns(tableData, setTableData)} data={tableData}/>
                                </div>
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

export default FormPage;

