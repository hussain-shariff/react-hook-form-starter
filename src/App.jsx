import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"

function App() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstName: "Elon",
			lastName: "Musk",
			lastNam: "sdad",
		},
	})

	const onSubmit = (data) => {
		console.log(data)
	}

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-gray-500 min-h-screen flex flex-col gap-3 justify-center items-center"
			>
				<input
					{...register("firstName", {
						required: "This is required",
						minLength: { value: 4, message: "Min Length is 4" },
						validate: (fieldValue) => {
							return fieldValue !== "Elon" || "Enter a different firstName"
						},
					})}
					className=" border-2 border-red-500 p-2"
				/>
				<p>{errors.firstName && errors.firstName.message}</p>
				<input
					{...register("lastName", {
						required: "This is required.",
						validate: {
							notShariff: (fieldValue) => {
								return fieldValue !== "shariff" || "LastName should Not be shariff"
							},
							notMusk: (fieldValue)=>{
								return fieldValue !== "musk" || "LastName should Not be musk"
							}
						},
					})}
					className=" border-2 border-red-500 p-2"
				/>
				<p>{errors.lastName && errors.lastName.message}</p>

				<button className=" bg-black text-white w-32">Submit</button>
			</form>
			<DevTool control={control} />
		</>
	)
}

export default App
