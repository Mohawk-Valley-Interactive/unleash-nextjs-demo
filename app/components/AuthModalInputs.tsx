interface Props {
  isSignIn: boolean;
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthModalInputs({
  isSignIn,
  inputs,
  handleInputChange,
}: Props) {
  return (
    <div>
      {isSignIn ? null : (
        <div className="my-3 flex justify-between text-sm">
          <input
            name="firstName"
            type="text"
            className="border rounded p-2 py-3 w-49% bg-white"
            placeholder="First Name"
            value={inputs.firstName}
            onChange={handleInputChange}
          />
          <input
            name="lastName"
            type="text"
            className="border rounded p-2 py-3 w-49% bg-white"
            placeholder="Last Name"
            value={inputs.lastName}
            onChange={handleInputChange}
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          name="email"
          type="text"
          className="border rounded p-2 py-3 w-full bg-white"
          placeholder="Email"
          value={inputs.email}
          onChange={handleInputChange}
        />
      </div>
      {isSignIn ? null : (
        <div className="my-3 flex justify-between text-sm">
          <input
            name="phone"
            type="text"
            className="border rounded p-2 py-3 w-49% bg-white"
            placeholder="Phone"
            value={inputs.phone}
            onChange={handleInputChange}
          />
          <input
            name="city"
            type="text"
            className="border rounded p-2 py-3 w-49% bg-white"
            placeholder="City"
            value={inputs.city}
            onChange={handleInputChange}
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          name="password"
          type="password"
          className="border rounded p-2 py-3 w-full bg-white"
          placeholder="Password"
          value={inputs.password}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
