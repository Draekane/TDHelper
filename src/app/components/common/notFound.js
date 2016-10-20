import React from 'react';
import { Link } from 'react-router';

export default function NotFound() {
    return (
        <div className="center">
            <h1>The url you specified was not found. Return <Link to="/" className="btn btn-primary"><i className="fa fa-home fa-lg" />&nbsp;&nbsp;Home</Link></h1>
        </div>
    );
}
