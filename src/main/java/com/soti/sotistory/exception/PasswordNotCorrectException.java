package com.soti.sotistory.exception;

public class PasswordNotCorrectException extends Exception {
    public PasswordNotCorrectException(String message) {
        super(message);
    }

    public PasswordNotCorrectException(String message, Throwable cause) {
        super(message, cause);
    }
}
