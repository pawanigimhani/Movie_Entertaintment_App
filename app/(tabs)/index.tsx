import { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, ImageBackground, Modal, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useShow } from '@/context/ShowContext';

type Show = {
  id: number;
  name: string;
  summary: string;
  image: { medium: string };
  status: string;
};

export default function HomeScreen() {
  const [shows, setShows] = useState<Show[]>([]);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null); 
  const { clickCount, incrementClick } = useShow();

  useEffect(() => {
    fetch('https://api.tvmaze.com/shows')
      .then(response => response.json())
      .then(data => setShows(data.slice(0, 20)));
  }, []);

  const ShowCard = ({ show }: { show: Show }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        incrementClick();
        setSelectedShow(show); 
      }}
    >
      <Image
        source={{ uri: show.image?.medium }}
        style={styles.image}
      />
      <View style={styles.content}>
        <ThemedText type="subtitle" style={styles.title}>{show.name}</ThemedText>
        <View style={styles.tag}>
          <ThemedText style={styles.tagText}>{show.status}</ThemedText>
        </View>
        <ThemedText numberOfLines={2} style={styles.text}>
          {show.summary?.replace(/<[^>]*>/g, '')}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('@/assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <FlatList
          data={shows}
          renderItem={({ item }) => <ShowCard show={item} />}
          keyExtractor={item => item.id.toString()}
        />
        <View style={styles.floatingButton}>
          <ThemedText style={styles.floatingButtonText}>
            Clicks: {clickCount}
          </ThemedText>
        </View>

        <Modal
          visible={!!selectedShow} 
          transparent={true}
          animationType="slide"
          onRequestClose={() => setSelectedShow(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedShow?.image?.medium }}
                style={styles.modalImage}
              />
              <ThemedText type="title" style={styles.modalTitle}>
                {selectedShow?.name}
              </ThemedText>
              <ThemedText style={styles.modalText}>
                {selectedShow?.summary?.replace(/<[^>]*>/g, '')}
              </ThemedText>
              <Pressable
                style={styles.closeButton}
                onPress={() => setSelectedShow(null)}
              >
                <ThemedText style={styles.closeButtonText}>Close</ThemedText>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#1a0221',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 150,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  title: {
    color: 'white',
  },
  tag: {
    backgroundColor: '#a941b5',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginVertical: 10,
  },
  tagText: {
    color: 'white',
    fontSize: 11,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#a941b5',
    padding: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingButtonText: {
    color: 'white',
  },
  text: {
    fontSize: 15,
    color: '#888',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a0221',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#a941b5',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
