from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam

def build_model(input_shape):
    model = Sequential()
    model.add(Dense(32, activation='relu', input_shape=input_shape))
    model.add(Dropout(0.2))
    model.add(Dense(64, activation='relu'))
    model.add(Dropout(0.2))
    model.add(Dense(1, activation='sigmoid'))
    model.compile(optimizer=Adam(), loss='binary_crossentropy', metrics=['accuracy'])
    return model

def train_model(model, x_train, y_train, epochs=100, batch_size=32, validation_split=0.2):
    model.fit(x_train, y_train, epochs=epochs, batch_size=batch_size, validation_split=validation_split)
    return model

def save_model(model, filepath):
    model.save(filepath)

def load_existing_model(filepath):
    return load_model(filepath)