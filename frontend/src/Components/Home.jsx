import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Redux/actions/User.js";

const roleLabel = (role) => {
    if (role === 0) return "Admin";
    if (role === 1) return "Doctor";
    if (role === 2) return "Patient";
    return "Unknown";
};

const Home = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userLogin);
    const { profile, loading, error } = useSelector((state) => state.userProfile);

    useEffect(() => {
        if (userInfo && !profile) {
            dispatch(getProfile());
        }
    }, [userInfo, profile, dispatch]);
    if (!userInfo) {
        return (
            <div>
                <h1>Welcome to HMS</h1>
                <p>This is a healthcare management system. Please sign in or sign up using the navigation bar.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Welcome, {profile?.name || userInfo.name}!</h1>
            <p>Email: {profile?.email || userInfo.email}</p>
            <p>Role: {roleLabel(profile?.role ?? userInfo.role)}</p>
            {loading && <p>Loading profile...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {/* Role-based dashboards or links */}
            {profile?.role === 0 && <div><h2>Admin Dashboard</h2></div>}
            {profile?.role === 1 && <div><h2>Doctor Dashboard</h2></div>}
            {profile?.role === 2 && <div><h2>Patient Dashboard</h2></div>}
        </div>
    );
};

export default Home;
