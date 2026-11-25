import React, {useEffect, useState} from 'react';
import {profile} from '../content/profile';
import {ui} from '../content/ui';
import {useLang, useTitle} from '../i18n';
import Icon from '../components/Icon';
import {PageHead} from '../components/parts';

export default function Contact() {
    const {t} = useLang();
    const [copied, setCopied] = useState(false);
    useTitle(t(ui.nav.contact));
    useEffect(() => {
        if (!copied) return undefined;
        const id = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(id);
    }, [copied]);
    const copy = () => {
        if (!navigator.clipboard) return; // only available over HTTPS or on localhost
        navigator.clipboard.writeText(profile.email).then(() => setCopied(true), () => {});
    };
    return (
        <div className="wrap page">
            <PageHead title={t(ui.contact.title)} intro={t(ui.contact.intro)}/>
            <p className="avail"><i aria-hidden="true"/>{t(profile.availability)}</p>
            <div className="tiles contact" data-tour="contact">
                <div className="tile">
                    <h2><Icon name="mail"/>{t(ui.contact.email)}</h2>
                    <p><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
                    <button type="button" className="chip chip--on" onClick={copy}><span aria-live="polite">{t(copied ? ui.contact.copied : ui.contact.copy)}</span></button>
                </div>
                <div className="tile">
                    <h2><Icon name="phone"/>{t(ui.contact.phone)}</h2>
                    <p><a href={profile.phoneHref}>{profile.phone}</a></p>
                </div>
                <div className="tile">
                    <h2><Icon name="pin"/>{t(ui.contact.place)}</h2>
                    <p>{t(profile.location)}</p>
                </div>
                <div className="tile">
                    <h2><Icon name="linkedin"/>LinkedIn</h2>
                    <p><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/oscarjrw</a></p>
                </div>
                <div className="tile">
                    <h2><Icon name="gitlab"/>GitLab</h2>
                    <p><a href={profile.gitlab} target="_blank" rel="noopener noreferrer">gitlab.com/oscarjrw</a></p>
                </div>
                <div className="tile tile--data">
                    <h2><Icon name="download"/>{t(ui.contact.cvTitle)}</h2>
                    <p>{t(ui.contact.cvText)}</p>
                    <p className="contact__cv">
                        <a href={profile.cv.fr} download>{t(ui.contact.cvFr)}</a>
                        <a href={profile.cv.en} download>{t(ui.contact.cvEn)}</a>
                    </p>
                </div>
            </div>
            <p className="also">{t(ui.contact.also)} {profile.otherSocials.map((s, i) => (
                <React.Fragment key={s.label}>{i > 0 && ', '}<a href={s.link} target="_blank" rel="noopener noreferrer">{s.label}</a></React.Fragment>
            ))}</p>
        </div>
    );
}
