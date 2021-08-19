import { User } from "./../models/user"

export default {
    Query: {
        users:() => User.find(),
        user:(parent, {id}) => User.findById(id),
        userExists: (_, {email}) =>{
            const filter = { email: email }
            const user = User.findOne(filter);
            return user;
        },
        getUsersByLocation:(_,{location})=>{
            const filter={location:location}
            const user=User.find(filter);
            return user;
        },

    },

    Mutation: {
        createUser: async(_, { email, fullName,restaurantName,GSTNumber,location, phoneNumber  }) => {
            const user = new User({ email, fullName, restaurantName,GSTNumber,location, phoneNumber });
            await user.save();
            return user;
        },
        deleteUser: async (_, {id}) => {
            await User.findByIdAndRemove(id);
            return "User deleted";
        },
        updateOtp: async (_, {email, otp}) => {
            const filter = { email: email }
            const update = { otp: otp };
            const user = await User.findOneAndUpdate(filter,update, {new: true});
            return user;
        },
        updateRestaurantName:async(_,{email,restaurantName})=>{
            const filter ={email:email}
            const update = {restaurantName:restaurantName};
            const user= await User.findOneAndUpdate(filter,update,{new:true});
            return user;
        },
        updateLocation:async(_,{email,location})=>{
            const filter={email:email}
            const update={location:location};
            const user=await User.findOneAndUpdate(filter,update,{new:true});
            return user;
        },
        updatePhoneNumber:async(_,{email,phoneNumber})=>{
            const filter={email:email}
            const update={phoneNumber:phoneNumber};
            const user=await User.findOneAndUpdate(filter,update,{new:true});
            return user;
        }
    }
}