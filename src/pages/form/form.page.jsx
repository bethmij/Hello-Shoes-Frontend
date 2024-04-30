import {InputItem} from "../../components/shared/input.jsx";
import {Button} from "../../components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {ScrollArea} from "../../components/ui/scroll-area.jsx";
import {useParams} from "react-router-dom";
import {customerForm} from "./formDetail/customer.js";
import {employeeForm} from "./formDetail/employee.js";
import {CgFormatRight} from "react-icons/cg";


function FormPage() {

    const {id} = useParams()
    let form = ""
    let title = ""

    if(id === "customer"){
        form = customerForm
        title = "Customer Form"
    }else if(id === "employee"){
        form = employeeForm
        title = "Employee Form"
    }


    const {register, handleSubmit} = useForm()

    return (
        <>
            <div className="absolute top-0 left-1/2 flex gap-x-5 -ms-32 mt-4 opacity-80">
                <CgFormatRight size="45"/>
                <h1 className="text-4xl ">{title}</h1>
            </div>


            <form className="w-4/5 h-4/5 ms-52 mt-32 flex-col rounded-3xl absolute xl"
                  onSubmit={handleSubmit(data => {
                      console.log(data)
                  })}>
                <ScrollArea className="h-full w-full rounded-3xl z-0">
                    <div id="form" className="w-full h-full absolute border-2 z-0 rounded-3xl "></div>

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
                                />

                            ))}
                        </div>
                    ))
            }
                </ScrollArea>

                <Button type="submit"
                        className=" w-2/12 h-12 absolute text-2xl text-opacity-40 -bottom-10 right-0 m-5 mt-10">Submit</Button>
            </form>
        </>
    )

}

export default FormPage