
export const groupName = /^([a-zA-Zа-яА-Я0-9_\-\s()]{1,50})$/;

export const userName = /^\S[-a-zA-ZёЁа-яА-Я0-9'`"\s_]{1,100}$/;

export const userNames = /^\S([-a-zA-Z_0-9 а-яА-Я\S\-_()]{1,50})$/;

export const vaultTitle = /^(?!\s+$)([A-Z0-9а-яА-Яa-zăâîșțĂÂÎȘȚ\s-]{0,50})$/;;

export const vaultDescription = /^([a-zA-Z0-9а-яА-Я\s\-_()]{0,70})$/;

export const vaultItemTitle = /^.{1,50}$/;
export const vaultItemTags = /^.{0,300}$/;

export const password = /^.{16,128}$/;
export const newPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{16,})^([^а-яА-ЯёЁ])+$/;

export const email = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
export const teamName = /^([a-zA-Z0-9_-]{1,50})$/;

export const cardholderName = /^.{0,100}$/;
export const cardType = /^.{0,100}$/;
export const cvc = /^.{0,4}$/;
export const number = /^[0-9\s]{0,20}$/;
export const cardDate = /^.{0,4}$/;
export const notes = /^.{0,300}$/;
export const dynamicField = /^.{0,200}$/;
export const passwordGenerator = /^.{0,128}$/;
export const label = /^.{1,200}$/;
