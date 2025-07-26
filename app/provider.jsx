"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient'
import React, { useContext, useEffect, useState } from 'react'

function Provider({ children }) {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        createNewUser();
    }, []);

    const createNewUser = () => {
        supabase.auth.getUser().then(async ({ data: { user } }) => {

            //If user already exist
            let { data: Users, error } = await supabase
                .from('Users')
                .select("*")
                .contains('email', [user.email])

            console.log(user)
            //New user
            if (Users?.length == 0) {
                const { data, error } = await supabase.from("Users")
                    .insert([
                        {
                            name: user?.user_metadata?.name,
                            email: [user?.email],
                            picture: user?.user_metadata?.picture
                        }
                    ]);

                console.log("Insert data:", data);
                setUser(data);
                setLoading(false);
                return;
            }
            setUser(Users[0]);
            setLoading(false);
        });
    }


    return (
        <UserDetailContext.Provider value={{ user, setUser }}>
            <div>
                {loading ? <div></div> : children}
            </div>
        </UserDetailContext.Provider>

    )
}

export default Provider

export const useUser = () => {
    const context = useContext(UserDetailContext);
    return context;
}