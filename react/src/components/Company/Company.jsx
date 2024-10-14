    import React, { useState } from 'react';
    import CompanyHeader from './CompanyHeader';
    import CompanyTabs from './CompanyTabs';
    import CompanyAbout from './CompanyAbout';


    export default function Company() {
    const [selectedTab, setSelectedTab] = useState('overview');

    return (
        <div className="max-w-7xl mx-auto p-6">
        <CompanyHeader />
        <CompanyTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {selectedTab === 'overview' && (
            <div>
            <CompanyAbout />
            </div>
        )}

        {selectedTab === 'jobs' && <div className="mt-6">Jobs section coming soon...</div>}
        </div>
    );
    }
