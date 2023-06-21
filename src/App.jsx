import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"

function App() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: async () => {
			const res = await fetch("https://jsonplaceholder.typicode.com/users/1")
			const data = await res.json()
			return {
				firstName: data.name,
				lastName: data.username,
				email: data.email,
				address: {
					street: data.address.street,
					city: data.address.city,
				},
				phoneNumbers : ['', '']
			}
		},
	})

	const onSubmit = (data) => {
		console.log(data)
	}

	return (
		<>
			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				className="bg-black min-h-screen flex justify-center items-center text-white"
			>
			<div className=" flex flex-col gap-2">
      <label htmlFor="firstname">firstname</label>
				<input
					{...register("firstName", {
						required: "This is required",
						minLength: { value: 4, message: "Min Length is 4" },
						validate: (fieldValue) => {
							return fieldValue !== "Elon" || "Enter a different firstName"
						},
					})}
					id="firstname"
					className=" border-2 border-gray-500 bg-slate-400 p-2"
				/>
				<p>{errors.firstName && errors.firstName.message}</p>
      <label htmlFor="lastName">Lastname</label>
				<input
					{...register("lastName", {
						required: "This is required.",
						validate: {
							notShariff: (fieldValue) => {
								return (
									fieldValue !== "shariff" || "LastName should Not be shariff"
								)
							},
							notMusk: (fieldValue) => {
								return fieldValue !== "Musk" || "LastName should Not be musk"
							},
						},
					})}
					id="lastName"
					className=" border-2 border-gray-500 bg-slate-400 p-2"
				/>
				<p>{errors.lastName && errors.lastName.message}</p>
      <label htmlFor="email">Email</label>
				<input
					className=" border-2 border-gray-500 bg-slate-400 p-2"
					id="email"
					type="email"
					{...register("email", {
						required: "Email is required",
					})}
				/>
				<p>{errors.email && errors.email.message}</p>
      <label htmlFor="city">City</label>
				<input
					id="city"
					className=" border-2 border-gray-500 bg-slate-400 p-2"
					{...register("address.city")}
				/>
			<label htmlFor="street">Street</label>
				<input
					id="street"
					className=" border-2 border-gray-500 bg-slate-400 p-2"
					{...register("address.street")}
				/>
      <label htmlFor="primaryPhone">Primary Phone Number</label>
				<input
					id="primaryPhone"
					className=" border-2 border-gray-500 bg-slate-400 p-2"
					{...register("phoneNumbers.0")}
				/>
      <label htmlFor="secondaryPhone">Secondary Phone Number</label>
				<input
					id="secondaryPhone"
					className=" border-2 border-gray-500 bg-slate-400 p-2"
					{...register("phoneNumbers.1")}
				/>
				<button className="border-2 border-blue-600 text-white w-32">Submit</button>
			</div>
			</form>
			<DevTool control={control} />
		</>
	)
}

export default App
