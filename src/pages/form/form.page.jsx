import {InputItem} from "../../components/shared/input.jsx";
import {Button} from "../../components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {ScrollArea} from "../../components/ui/scroll-area.jsx";
import {useParams} from "react-router-dom";
import {customerForm} from "./formDetail/customer.js";


function FormPage() {

    const {id} =useParams()


    const {register, handleSubmit} = useForm()

    return (
        <form className="w-4/5 h-4/5 ms-52 mt-32 flex-col rounded-3xl absolute xl"
              onSubmit={handleSubmit(data => {
                  console.log(data)
              })}>
            <ScrollArea className="h-full w-full rounded-3xl z-0">
                <div id="form" className="w-full h-full absolute border-2 z-0 rounded-3xl "></div>


                {customerForm.map((customer, index) => (
                    <div key={index} className="flex justify-around mb-4 z-10">
                        {customer.map(data => (
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
                ))}
            </ScrollArea>

            <Button type="submit"
                    className=" w-2/12 h-12 absolute text-2xl text-opacity-40 -bottom-10 right-0 m-5 mt-10">Submit</Button>
        </form>
    )

}

export default FormPage