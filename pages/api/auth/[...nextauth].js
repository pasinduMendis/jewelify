import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "./lib/mongodb"
import axios from "axios";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  //adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        //console.log("*****")
        const email=credentials.email;
        const password=credentials.password;
        const user = await axios.post('https://api.jewelify.ai/.netlify/functions/sign-in',{email:email,password:password})
        
        if (user.data.user) {
          // Any object returned will be saved in `user` property of the JWT
          //console.log("user available")
          //console.log(user.data.user)
          return user.data.user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
         throw new Error(user.data.message)
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  pages: {
    signIn: '/sign-in',
  }, 
  callbacks:{
    jwt:({token,user})=>{
      //console.log(user)
      if(user){
        token.id=user._id
        token.accessToken=user.accessToken
        token.profilePicture=user.profilePicture
        token.name=user.name
        token.isPayment=user.isPayment
      }
      return token;
    },
    session:({session,token})=>{
      if(token){
        session.id=token.id;
        session.authToken=token.accessToken;
        session.profilePicture=token.profilePicture;
        session.name=token.name;
        session.isPayment=token.isPayment;
      }
      return session
    }
  },
  secret:'secret',
  jwt:{
    secret:"secret",
    encryption:true,
  },
  //database:process.env.MONGO_URI,
  
})