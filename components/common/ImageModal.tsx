import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession, signOut } from "next-auth/client";
import styled from "styled-components";
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

const OverlayStyles = styled.div`
    position:fixed;
    top:5%;
    left:5%;
    right:5%;
    bottom:5%;
    background-color:rgba(150,150,150,0.95);
    z-index:100;
`

const ImageModalStyles = styled.div`
    position:relative;
    width:100%;
    height:100%;
    padding:2.5rem;
    box-shadow: var(--bs);
    border-radius: var(--border-radius);
    i {
        position: absolute;
        top: 0.25rem;
        right: 0.25rem;
        cursor:pointer;
        z-index:99;
    }
    .image-container {
        width: 100%;
        height:100%;
        /* overflow:auto; */
        div {
        position: unset !important;
        }

        img {
            border: 2px solid var(--focus) !important;
            border-radius: var(--border-radius);
            object-fit: contain;
            max-width: 100%;
            max-height:100%;
            padding:2rem !important;
            /* margin:1rem 1rem 1rem 1rem !important; */
            /* position: relative !important; */
            /* height: unset !important; */
        }
    }

`;

function ImageModal({ open, imgUrl, onClose }: any) {
    if (!open) return null

    return (
        <OverlayStyles>
            <ImageModalStyles>
                <i>
                    <FontAwesomeIcon 
                        icon={faTimesCircle} 
                        color={"black"} 
                        onClick={onClose} 
                        size={"2x"}
                        />
                </i>
                <div className = "image-container">
                        <Image
                            layout="fill"
                                // // objectFit="cover"
                                // width="100%"
                                // height="100%"
                                src={imgUrl}
                                alt="image"
                                className = "image"
                        />
                </div>
            </ImageModalStyles >
        </OverlayStyles>)
}

export default ImageModal
